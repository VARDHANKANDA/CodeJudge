import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { LANGUAGE_CONFIGS } from './configs/languages';

export interface TestCaseInput {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface ExecutionResult {
  verdict: 'ACCEPTED' | 'WRONG_ANSWER' | 'COMPILATION_ERROR' | 'RUNTIME_ERROR' | 'TIME_LIMIT_EXCEEDED' | 'MEMORY_LIMIT_EXCEEDED';
  executionTime?: number; // in ms
  memoryUsage?: number;   // in KB
  errorLog?: string;
  testCasePassedCount: number;
  totalTestCases: number;
}

export async function runSandbox(
  submissionId: string,
  code: string,
  language: string,
  testCases: TestCaseInput[],
  timeLimitMs: number,
  memoryLimitMb: number,
): Promise<ExecutionResult> {
  const langConfig = LANGUAGE_CONFIGS[language.toLowerCase()];
  if (!langConfig) {
    return {
      verdict: 'COMPILATION_ERROR',
      errorLog: `Unsupported language: ${language}`,
      testCasePassedCount: 0,
      totalTestCases: testCases.length,
    };
  }

  // Create platform-independent temp folder for code mounting
  const tempBaseDir = process.env.TEMP_DIR || path.join(process.cwd(), 'temp');
  if (!fs.existsSync(tempBaseDir)) {
    fs.mkdirSync(tempBaseDir, { recursive: true });
  }

  const sanitizedSubId = submissionId.replace(/[^a-zA-Z0-9_-]/g, '');
  const submissionDir = path.join(tempBaseDir, sanitizedSubId);
  fs.mkdirSync(submissionDir, { recursive: true });

  // Write source code
  const sourceFilePath = path.join(submissionDir, langConfig.filename);
  fs.writeFileSync(sourceFilePath, code, 'utf-8');

  try {
    // 1. Compilation Stage (if required)
    if (langConfig.compileCmd) {
      const compileContainerName = `codejudge-compile-${sanitizedSubId}-${Date.now()}`;
      const compileResult = await runContainerCommand(
        submissionDir,
        langConfig.compileCmd,
        10000, // 10s compile limit
        512,   // 512MB compilation memory
        false, // Write access needed to output binaries
        compileContainerName,
      );

      if (compileResult.exitCode !== 0) {
        cleanTempDir(submissionDir);
        return {
          verdict: 'COMPILATION_ERROR',
          errorLog: compileResult.stderr || compileResult.stdout || 'Compilation failed with unknown error',
          testCasePassedCount: 0,
          totalTestCases: testCases.length,
        };
      }
    }

    // 2. Execution Stage for each testcase
    let testCasePassedCount = 0;
    let maxTimeMs = 0;
    let maxMemoryKb = 0;

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      const runContainerName = `codejudge-run-${sanitizedSubId}-${i}-${Date.now()}`;
      
      // We run standard '/usr/bin/time -f "%e %M" <runCmd>' to get runtime and memory
      const runResult = await runContainerCommand(
        submissionDir,
        `/usr/bin/time -f "%e %M" ${langConfig.runCmd}`,
        timeLimitMs,
        memoryLimitMb,
        true, // read-only mount
        runContainerName,
        tc.input,
      );

      if (runResult.timedOut) {
        cleanTempDir(submissionDir);
        return {
          verdict: 'TIME_LIMIT_EXCEEDED',
          errorLog: `Time Limit Exceeded (Limit: ${timeLimitMs}ms)`,
          testCasePassedCount,
          totalTestCases: testCases.length,
          executionTime: timeLimitMs,
        };
      }

      if (runResult.exitCode === 137 || runResult.oomKilled) {
        cleanTempDir(submissionDir);
        return {
          verdict: 'MEMORY_LIMIT_EXCEEDED',
          errorLog: `Memory Limit Exceeded (Limit: ${memoryLimitMb}MB)`,
          testCasePassedCount,
          totalTestCases: testCases.length,
          memoryUsage: memoryLimitMb * 1024,
        };
      }

      if (runResult.exitCode !== 0) {
        cleanTempDir(submissionDir);
        return {
          verdict: 'RUNTIME_ERROR',
          errorLog: runResult.stderr || 'Runtime error encountered during execution',
          testCasePassedCount,
          totalTestCases: testCases.length,
        };
      }

      // Parse time and memory statistics from the last line of stderr
      const stderrLines = runResult.stderr.trim().split('\n');
      const timeMemoryLine = stderrLines[stderrLines.length - 1];
      const restStderr = stderrLines.slice(0, -1).join('\n');

      const parts = timeMemoryLine.trim().split(/\s+/);
      let runTimeMs = 0;
      let memoryKb = 0;

      if (parts.length === 2) {
        const timeSec = parseFloat(parts[0]);
        runTimeMs = Math.round(timeSec * 1000);
        memoryKb = parseInt(parts[1], 10);
      } else {
        // Fallback if parsing failed due to runtime panic print to stderr
        if (restStderr || runResult.stderr) {
          cleanTempDir(submissionDir);
          return {
            verdict: 'RUNTIME_ERROR',
            errorLog: runResult.stderr,
            testCasePassedCount,
            totalTestCases: testCases.length,
          };
        }
      }

      maxTimeMs = Math.max(maxTimeMs, runTimeMs);
      maxMemoryKb = Math.max(maxMemoryKb, memoryKb);

      // Verify outputs
      const actualOut = runResult.stdout.trim().replace(/\r\n/g, '\n');
      const expectedOut = tc.expectedOutput.trim().replace(/\r\n/g, '\n');

      if (actualOut === expectedOut) {
        testCasePassedCount++;
      } else {
        cleanTempDir(submissionDir);
        return {
          verdict: 'WRONG_ANSWER',
          errorLog: tc.isHidden
            ? 'Failed on a hidden testcase'
            : `Input:\n${tc.input}\n\nExpected:\n${expectedOut}\n\nActual:\n${actualOut.substring(0, 1000)}`,
          testCasePassedCount,
          totalTestCases: testCases.length,
          executionTime: maxTimeMs,
          memoryUsage: maxMemoryKb,
        };
      }
    }

    cleanTempDir(submissionDir);
    return {
      verdict: 'ACCEPTED',
      testCasePassedCount,
      totalTestCases: testCases.length,
      executionTime: maxTimeMs,
      memoryUsage: maxMemoryKb,
    };
  } catch (error: any) {
    cleanTempDir(submissionDir);
    return {
      verdict: 'RUNTIME_ERROR',
      errorLog: `Internal execution error: ${error.message}`,
      testCasePassedCount: 0,
      totalTestCases: testCases.length,
    };
  }
}

interface CommandResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
  timedOut: boolean;
  oomKilled: boolean;
}

function runContainerCommand(
  dir: string,
  command: string,
  timeoutMs: number,
  memoryLimitMb: number,
  readOnly: boolean,
  containerName: string,
  stdinContent?: string,
): Promise<CommandResult> {
  return new Promise((resolve) => {
    // Docker run arguments with unique container name
    const dockerArgs = [
      'run',
      '--rm',
      '--name',
      containerName,
      '-i',
      '--network=none',
      `--memory=${memoryLimitMb}m`,
      '--cpus=0.5',
      '--pids-limit=32',
      '-v',
      `${dir}:/code:${readOnly ? 'ro' : 'rw'}`,
      'codejudge-sandbox:latest',
      'sh',
      '-c',
      command,
    ];

    const child = spawn('docker', dockerArgs);

    let stdout = '';
    let stderr = '';
    let timedOut = false;
    let completed = false;

    // Timeout control: kills ONLY this specific container name
    const timer = setTimeout(() => {
      timedOut = true;
      completed = true;
      try {
        child.kill('SIGKILL');
        // Targeted kill and removal of only this specific container
        const killer = spawn('docker', ['kill', containerName]);
        killer.on('close', () => {
          spawn('docker', ['rm', '-f', containerName]);
        });
      } catch (err) {
        // ignore error
      }
      resolve({
        stdout: '',
        stderr: 'Time Limit Exceeded',
        exitCode: null,
        timedOut: true,
        oomKilled: false,
      });
    }, timeoutMs + 1000); // 1s buffer for Docker container overhead

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    if (stdinContent) {
      child.stdin.write(stdinContent);
      child.stdin.end();
    }

    child.on('close', (code) => {
      if (completed) return;
      clearTimeout(timer);
      completed = true;

      // Exit code 137 indicates OOM or SIGKILL
      const oomKilled = code === 137;

      resolve({
        stdout,
        stderr,
        exitCode: code,
        timedOut: false,
        oomKilled,
      });
    });

    child.on('error', (err) => {
      if (completed) return;
      clearTimeout(timer);
      completed = true;
      resolve({
        stdout: '',
        stderr: `Failed to execute: ${err.message}`,
        exitCode: -1,
        timedOut: false,
        oomKilled: false,
      });
    });
  });
}

function cleanTempDir(dir: string) {
  try {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  } catch (err) {
    // Ignore cleanup error
  }
}

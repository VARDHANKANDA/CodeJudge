import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { QualityStatus } from '@prisma/client';

export interface VerificationResult {
  problemId: string;
  problemTitle: string;
  language: string;
  isVerified: boolean;
  qualityStatus: QualityStatus;
  passedCount: number;
  totalCount: number;
  error?: string;
  executionTimeMs?: number;
}

@Injectable()
export class ProblemVerifierService {
  private readonly logger = new Logger(ProblemVerifierService.name);

  constructor(private prisma: PrismaService) {}

  async verifyProblem(problemId: string): Promise<VerificationResult> {
    const problem = await this.prisma.problem.findUnique({
      where: { id: problemId },
      include: {
        testCases: { orderBy: { order: 'asc' } },
        editorial: true,
      },
    });

    if (!problem) {
      throw new Error(`Problem not found: ${problemId}`);
    }

    if (problem.testCases.length === 0) {
      await this.prisma.problem.update({
        where: { id: problemId },
        data: { isVerified: false, qualityStatus: QualityStatus.REVIEW },
      });
      return {
        problemId,
        problemTitle: problem.title,
        language: 'none',
        isVerified: false,
        qualityStatus: QualityStatus.REVIEW,
        passedCount: 0,
        totalCount: 0,
        error: 'No testcases defined for problem',
      };
    }

    // Determine reference solution: check referenceSolutions or codeTemplates
    const refSolutions = (problem.referenceSolutions || {}) as Record<string, string>;
    const codeTemplates = (problem.codeTemplates || {}) as Record<string, string>;

    const language = refSolutions['python'] ? 'python' :
      refSolutions['javascript'] ? 'javascript' :
      codeTemplates['python'] ? 'python' :
      codeTemplates['javascript'] ? 'javascript' : 'python';

    const sourceCode = refSolutions[language] || codeTemplates[language];

    if (!sourceCode) {
      await this.prisma.problem.update({
        where: { id: problemId },
        data: { isVerified: false, qualityStatus: QualityStatus.REVIEW },
      });
      return {
        problemId,
        problemTitle: problem.title,
        language,
        isVerified: false,
        qualityStatus: QualityStatus.REVIEW,
        passedCount: 0,
        totalCount: problem.testCases.length,
        error: 'No reference solution or template found to verify',
      };
    }

    // Execute reference solution against all test cases
    const tempDir = path.join(process.cwd(), 'temp', `verify_${problem.slug}_${Date.now()}`);
    fs.mkdirSync(tempDir, { recursive: true });

    const filename = language === 'python' ? 'solution.py' : 'solution.js';
    const filePath = path.join(tempDir, filename);
    fs.writeFileSync(filePath, sourceCode, 'utf8');

    let passedCount = 0;
    let maxTimeMs = 0;
    let failedReason = '';

    try {
      for (const tc of problem.testCases) {
        const cmd = language === 'python' ? 'python' : 'node';
        const args = [filename];

        const start = Date.now();
        const res = await new Promise<{ stdout: string; stderr: string; exitCode: number | null }>((resolve) => {
          const child = spawn(cmd, args, { cwd: tempDir, shell: true, windowsHide: true });
          let stdout = '';
          let stderr = '';

          const timer = setTimeout(() => {
            try { child.kill(); } catch {}
            resolve({ stdout: '', stderr: 'Time Limit Exceeded', exitCode: -1 });
          }, problem.timeLimit + 2000);

          child.stdout?.on('data', (d) => { stdout += d.toString(); });
          child.stderr?.on('data', (d) => { stderr += d.toString(); });

          if (tc.input) {
            child.stdin.write(tc.input);
          }
          child.stdin.end();

          child.on('close', (code) => {
            clearTimeout(timer);
            resolve({ stdout, stderr, exitCode: code });
          });
          child.on('error', (err) => {
            clearTimeout(timer);
            resolve({ stdout: '', stderr: err.message, exitCode: -1 });
          });
        });

        const elapsed = Date.now() - start;
        maxTimeMs = Math.max(maxTimeMs, elapsed);

        if (res.exitCode !== 0) {
          failedReason = `Runtime/Execution failure on testcase: ${res.stderr || 'Non-zero exit'}`;
          break;
        }

        const actual = res.stdout.trim().replace(/\r\n/g, '\n');
        const expected = tc.expectedOutput.trim().replace(/\r\n/g, '\n');

        if (actual === expected) {
          passedCount++;
        } else {
          failedReason = `Output mismatch. Expected: "${expected.slice(0, 100)}", Got: "${actual.slice(0, 100)}"`;
          break;
        }
      }
    } finally {
      try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch {}
    }

    const isVerified = passedCount === problem.testCases.length;
    const qualityStatus = isVerified ? QualityStatus.VERIFIED : QualityStatus.REVIEW;

    await this.prisma.problem.update({
      where: { id: problemId },
      data: {
        isVerified,
        qualityStatus: isVerified ? (problem.isPublished ? QualityStatus.PUBLISHED : QualityStatus.VERIFIED) : QualityStatus.REVIEW,
      },
    });

    this.logger.log(`Problem ${problem.slug} verification: ${isVerified ? 'PASSED' : 'FAILED'} (${passedCount}/${problem.testCases.length})`);

    return {
      problemId,
      problemTitle: problem.title,
      language,
      isVerified,
      qualityStatus,
      passedCount,
      totalCount: problem.testCases.length,
      error: failedReason || undefined,
      executionTimeMs: maxTimeMs,
    };
  }

  async verifyAllProblems(): Promise<VerificationResult[]> {
    const problems = await this.prisma.problem.findMany({
      select: { id: true },
    });
    const results: VerificationResult[] = [];
    for (const p of problems) {
      const res = await this.verifyProblem(p.id);
      results.push(res);
    }
    return results;
  }
}

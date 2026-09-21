export interface LanguageConfig {
  name: string;
  extension: string;
  filename: string;
  compileCmd: string | null;
  runCmd: string;
}

export const LANGUAGE_CONFIGS: Record<string, LanguageConfig> = {
  c: {
    name: 'C',
    extension: 'c',
    filename: 'solution.c',
    compileCmd: 'gcc -O2 solution.c -o solution',
    runCmd: './solution',
  },
  cpp: {
    name: 'C++',
    extension: 'cpp',
    filename: 'solution.cpp',
    compileCmd: 'g++ -O3 solution.cpp -o solution',
    runCmd: './solution',
  },
  java: {
    name: 'Java',
    extension: 'java',
    filename: 'Solution.java', // Java class must match file name
    compileCmd: 'javac Solution.java',
    runCmd: 'java Solution',
  },
  python: {
    name: 'Python',
    extension: 'py',
    filename: 'solution.py',
    compileCmd: null,
    runCmd: 'python3 solution.py',
  },
  javascript: {
    name: 'JavaScript',
    extension: 'js',
    filename: 'solution.js',
    compileCmd: null,
    runCmd: 'node solution.js',
  },
  typescript: {
    name: 'TypeScript',
    extension: 'ts',
    filename: 'solution.ts',
    compileCmd: 'tsc solution.ts --target es2021 --skipLibCheck true',
    runCmd: 'node solution.js',
  },
  go: {
    name: 'Go',
    extension: 'go',
    filename: 'solution.go',
    compileCmd: 'go build -o solution solution.go',
    runCmd: './solution',
  },
  rust: {
    name: 'Rust',
    extension: 'rs',
    filename: 'solution.rs',
    compileCmd: 'rustc -O solution.rs -o solution',
    runCmd: './solution',
  },
};

import * as fs from 'fs';
import * as path from 'path';

export interface ProblemSpec {
  title: string;
  slug: string;
  description: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  timeLimit: number;
  memoryLimit: number;
  constraints: string;
  inputFormat: string;
  outputFormat: string;
  sampleInput: string;
  sampleOutput: string;
  points: number;
  hints: string[];
  codeTemplates: { python: string; javascript: string };
  referenceSolutions: { python: string; javascript: string };
  editorial: {
    approach: string;
    algorithm: string;
    timeComplexity: string;
    spaceComplexity: string;
    content: string;
    referenceCode: string;
  };
  tags: string[];
  testCases: { input: string; expectedOutput: string; isHidden: boolean; order?: number }[];
}

export function writePack(filename: string, exportName: string, problems: ProblemSpec[]) {
  const outPath = path.join(__dirname, 'problem-packs', filename);
  const content = `import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const ${exportName}: ProblemDef[] = ${JSON.stringify(problems, null, 2)
    .replace(/"difficulty": "EASY"/g, '"difficulty": Difficulty.EASY')
    .replace(/"difficulty": "MEDIUM"/g, '"difficulty": Difficulty.MEDIUM')
    .replace(/"difficulty": "HARD"/g, '"difficulty": Difficulty.HARD')};
`;
  fs.writeFileSync(outPath, content, 'utf8');
  console.log(`Successfully wrote ${problems.length} problems to ${filename}`);
}

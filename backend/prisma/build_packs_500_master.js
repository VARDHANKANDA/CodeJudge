const fs = require('fs');
const path = require('path');

const PACK_DIR = path.join(__dirname, 'problem-packs');

function exportPack(fileName, varName, problems) {
  const filePath = path.join(PACK_DIR, fileName);
  const jsonStr = JSON.stringify(problems, null, 2).replace(/"difficulty": "(EASY|MEDIUM|HARD)"/g, 'difficulty: Difficulty.$1');
  const fileContent = `import { Difficulty } from '@prisma/client';
import { ProblemDef } from './pack-milestone-50';

export const ${varName}: ProblemDef[] = ${jsonStr};
`;
  fs.writeFileSync(filePath, fileContent, 'utf-8');
  console.log(`✓ Exported ${fileName} with ${problems.length} problems`);
}

console.log('Master generator loaded.');

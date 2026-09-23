import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixSudoku() {
  const p = await prisma.problem.findUnique({
    where: { slug: 'sudoku-solver-grid-completer' },
    include: { testCases: true },
  });
  if (p) {
    // Set existing to visible
    if (p.testCases.length > 0) {
      await prisma.testCase.update({
        where: { id: p.testCases[0].id },
        data: { isHidden: false, order: 0 },
      });
    }
    // Add a second hidden testcase
    const board = [
      ['5','3','.','.','7','.','.','.','.'],
      ['6','.','.','1','9','5','.','.','.'],
      ['.','9','8','.','.','.','.','6','.'],
      ['8','.','.','.','6','.','.','.','3'],
      ['4','.','.','8','.','3','.','.','1'],
      ['7','.','.','.','2','.','.','.','6'],
      ['.','6','.','.','.','.','2','8','.'],
      ['.','.','.','4','1','9','.','.','5'],
      ['.','.','.','.','8','.','.','7','9']
    ];
    const solved = [
      ['5','3','4','6','7','8','9','1','2'],
      ['6','7','2','1','9','5','3','4','8'],
      ['1','9','8','3','4','2','5','6','7'],
      ['8','5','9','7','6','1','4','2','3'],
      ['4','2','6','8','5','3','7','9','1'],
      ['7','1','3','9','2','4','8','5','6'],
      ['9','6','1','5','3','7','2','8','4'],
      ['2','8','7','4','1','9','6','3','5'],
      ['3','4','5','2','8','6','1','7','9']
    ];
    if (p.testCases.length < 2) {
      await prisma.testCase.create({
        data: {
          problemId: p.id,
          input: JSON.stringify(board),
          expectedOutput: JSON.stringify(solved),
          isHidden: true,
          order: 1,
        },
      });
    }
  }
  console.log('Sudoku test cases updated.');
  await prisma.$disconnect();
}
fixSudoku();

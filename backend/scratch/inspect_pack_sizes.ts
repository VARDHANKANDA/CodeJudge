import { batch1ProblemDefs } from '../prisma/problems-batch1';
import { pack50ProblemDefs } from '../prisma/problem-packs/pack-milestone-50';
import { pack100ProblemDefs } from '../prisma/problem-packs/pack-milestone-100';
import { pack100Part2ProblemDefs } from '../prisma/problem-packs/pack-milestone-100-part2';
import { pack100Part3ProblemDefs } from '../prisma/problem-packs/pack-milestone-100-part3';
import { pack100Part4ProblemDefs } from '../prisma/problem-packs/pack-milestone-100-part4';
import { pack250Part1ProblemDefs } from '../prisma/problem-packs/pack-milestone-250-part1';
import { pack250Part2ProblemDefs } from '../prisma/problem-packs/pack-milestone-250-part2';
import { pack250Part3ProblemDefs } from '../prisma/problem-packs/pack-milestone-250-part3';
import { pack250Batch1Defs } from '../prisma/problem-packs/pack-milestone-250-batch1';
import { pack250Batch2Defs } from '../prisma/problem-packs/pack-milestone-250-batch2';
import { pack250Batch3Defs } from '../prisma/problem-packs/pack-milestone-250-batch3';
import { pack250Batch4Defs } from '../prisma/problem-packs/pack-milestone-250-batch4';
import { pack250Batch5Defs } from '../prisma/problem-packs/pack-milestone-250-batch5';
import { pack250ExtADefs } from '../prisma/problem-packs/pack-250-ext-a';
import { pack250ExtBDefs } from '../prisma/problem-packs/pack-250-ext-b';
import { pack250ExtCDefs } from '../prisma/problem-packs/pack-250-ext-c';
import { pack250ExtDDefs } from '../prisma/problem-packs/pack-250-ext-d';
import { pack250ExtEDefs } from '../prisma/problem-packs/pack-250-ext-e';
import { pack250ExtFDefs } from '../prisma/problem-packs/pack-250-ext-f';
import { pack250ExtGDefs } from '../prisma/problem-packs/pack-250-ext-g';
import { pack250ExtHDefs } from '../prisma/problem-packs/pack-250-ext-h';
import { pack250ExtIDefs } from '../prisma/problem-packs/pack-250-ext-i';
import { pack250ExtJDefs } from '../prisma/problem-packs/pack-250-ext-j';
import { pack250ExtKDefs } from '../prisma/problem-packs/pack-250-ext-k';
import { pack250ExtLDefs } from '../prisma/problem-packs/pack-250-ext-l';
import { pack250ExtMDefs } from '../prisma/problem-packs/pack-250-ext-m';
import { pack250ExtNDefs } from '../prisma/problem-packs/pack-250-ext-n';
import { pack250ExtODefs } from '../prisma/problem-packs/pack-250-ext-o';
import { pack250ExtPDefs } from '../prisma/problem-packs/pack-250-ext-p';
import { pack250ExtQDefs } from '../prisma/problem-packs/pack-250-ext-q';

import { pack500PartADefs } from '../prisma/problem-packs/pack-500-part-a';
import { pack500PartBDefs } from '../prisma/problem-packs/pack-500-part-b';
import { pack500PartCDefs } from '../prisma/problem-packs/pack-500-part-c';
import { pack500PartDDefs } from '../prisma/problem-packs/pack-500-part-d';
import { pack500PartEDefs } from '../prisma/problem-packs/pack-500-part-e';
import { pack500PartFDefs } from '../prisma/problem-packs/pack-500-part-f';
import { pack500PartGDefs } from '../prisma/problem-packs/pack-500-part-g';
import { pack500PartHDefs } from '../prisma/problem-packs/pack-500-part-h';
import { pack500PartIDefs } from '../prisma/problem-packs/pack-500-part-i';
import { pack500PartJDefs } from '../prisma/problem-packs/pack-500-part-j';
import { pack500PartKDefs } from '../prisma/problem-packs/pack-500-part-k';
import { pack500PartLDefs } from '../prisma/problem-packs/pack-500-part-l';
import { pack500PartMDefs } from '../prisma/problem-packs/pack-500-part-m';

const packs: [string, any[]][] = [
  ['batch1', batch1ProblemDefs],
  ['pack50', pack50ProblemDefs],
  ['pack100', pack100ProblemDefs],
  ['pack100Part2', pack100Part2ProblemDefs],
  ['pack100Part3', pack100Part3ProblemDefs],
  ['pack100Part4', pack100Part4ProblemDefs],
  ['pack250Part1', pack250Part1ProblemDefs],
  ['pack250Part2', pack250Part2ProblemDefs],
  ['pack250Part3', pack250Part3ProblemDefs],
  ['pack250Batch1', pack250Batch1Defs],
  ['pack250Batch2', pack250Batch2Defs],
  ['pack250Batch3', pack250Batch3Defs],
  ['pack250Batch4', pack250Batch4Defs],
  ['pack250Batch5', pack250Batch5Defs],
  ['pack250ExtA', pack250ExtADefs],
  ['pack250ExtB', pack250ExtBDefs],
  ['pack250ExtC', pack250ExtCDefs],
  ['pack250ExtD', pack250ExtDDefs],
  ['pack250ExtE', pack250ExtEDefs],
  ['pack250ExtF', pack250ExtFDefs],
  ['pack250ExtG', pack250ExtGDefs],
  ['pack250ExtH', pack250ExtHDefs],
  ['pack250ExtI', pack250ExtIDefs],
  ['pack250ExtJ', pack250ExtJDefs],
  ['pack250ExtK', pack250ExtKDefs],
  ['pack250ExtL', pack250ExtLDefs],
  ['pack250ExtM', pack250ExtMDefs],
  ['pack250ExtN', pack250ExtNDefs],
  ['pack250ExtO', pack250ExtODefs],
  ['pack250ExtP', pack250ExtPDefs],
  ['pack250ExtQ', pack250ExtQDefs],
  ['pack500PartA', pack500PartADefs],
  ['pack500PartB', pack500PartBDefs],
  ['pack500PartC', pack500PartCDefs],
  ['pack500PartD', pack500PartDDefs],
  ['pack500PartE', pack500PartEDefs],
  ['pack500PartF', pack500PartFDefs],
  ['pack500PartG', pack500PartGDefs],
  ['pack500PartH', pack500PartHDefs],
  ['pack500PartI', pack500PartIDefs],
  ['pack500PartJ', pack500PartJDefs],
  ['pack500PartK', pack500PartKDefs],
  ['pack500PartL', pack500PartLDefs],
  ['pack500PartM', pack500PartMDefs],
];

let sum = 0;
for (const [name, arr] of packs) {
  console.log(`${name}: ${arr.length}`);
  sum += arr.length;
}
console.log('Total across all packs:', sum);

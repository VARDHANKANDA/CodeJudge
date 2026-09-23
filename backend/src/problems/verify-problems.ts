import * as dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client';
import { ProblemVerifierService } from './problem-verifier.service';
import { PrismaService } from '../prisma/prisma.service';

async function main() {
  console.log('================================================================');
  console.log('STARTING AUTOMATED CANONICAL PROBLEM QUALITY PIPELINE VERIFICATION');
  console.log('================================================================');

  const prisma = new PrismaClient();
  const prismaService = prisma as unknown as PrismaService;
  const verifier = new ProblemVerifierService(prismaService);

  try {
    const results = await verifier.verifyAllProblems();
    console.log(`\nVerified ${results.length} total problems.`);

    let passed = 0;
    let failed = 0;

    for (const r of results) {
      if (r.isVerified) {
        passed++;
        console.log(`✓ [PASSED] ${r.problemTitle} (${r.passedCount}/${r.totalCount} tests, ${r.executionTimeMs}ms)`);
      } else {
        failed++;
        console.log(`✗ [FAILED] ${r.problemTitle} (${r.passedCount}/${r.totalCount} tests) - ${r.error}`);
      }
    }

    console.log('\n================================================================');
    console.log(`VERIFICATION SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('================================================================');

    if (failed > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('Problem verification failed with error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

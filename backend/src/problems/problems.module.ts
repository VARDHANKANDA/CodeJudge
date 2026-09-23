import { Module } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { ProblemsController } from './problems.controller';
import { ProblemVerifierService } from './problem-verifier.service';

@Module({
  controllers: [ProblemsController],
  providers: [ProblemsService, ProblemVerifierService],
  exports: [ProblemsService, ProblemVerifierService],
})
export class ProblemsModule {}

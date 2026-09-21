import { Module } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmissionsController } from './submissions.controller';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'submission-queue',
    }),
  ],
  controllers: [SubmissionsController],
  providers: [SubmissionsService],
  exports: [SubmissionsService],
})
export class SubmissionsModule {}

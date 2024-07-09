import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeadershipService } from './leadership.service';
import { LeadershipController } from './leadership.controller';
import { Leadership, LeadershipSchema } from '../schemas/leadership.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Leadership.name,
        schema: LeadershipSchema,
      },
    ]),
  ],
  controllers: [LeadershipController],
  providers: [LeadershipService],
  exports: [MongooseModule],
})
export class LeadershipModule { }

import { Module } from '@nestjs/common';
import { DetailsController } from './details.controller';
import { DetailsService } from './details.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [DetailsController],
  providers: [DetailsService, PrismaService],
})
export class DetailsModule {}

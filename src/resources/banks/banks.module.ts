import { Module } from '@nestjs/common';
import { BanksService } from './banks.service';
import { BanksController } from './banks.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [BanksController],
  providers: [BanksService],
  exports: [BanksService],
  imports: [PrismaModule],
})
export class BanksModule {}

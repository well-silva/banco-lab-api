import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [AccountsModule],
})
export class TransactionsModule {}

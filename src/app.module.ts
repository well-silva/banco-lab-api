import { Module } from '@nestjs/common';
import { BanksModule } from './resources/banks/banks.module';
import { UsersModule } from './resources/users/users.module';
import { AccountsModule } from './resources/accounts/accounts.module';
import { TransactionsModule } from './resources/transactions/transactions.module';
import { AuthModule } from './resources/auth/auth.module';

@Module({
  imports: [
    BanksModule,
    UsersModule,
    AccountsModule,
    TransactionsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

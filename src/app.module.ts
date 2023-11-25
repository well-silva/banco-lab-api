import { Module } from '@nestjs/common';
import { BanksModule } from './resources/banks/banks.module';
import { UsersModule } from './resources/users/users.module';
import { AccountsModule } from './resources/accounts/accounts.module';

@Module({
  imports: [BanksModule, UsersModule, AccountsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

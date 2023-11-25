import { Module } from '@nestjs/common';
import { BanksModule } from './resources/banks/banks.module';
import { UsersModule } from './resources/users/users.module';

@Module({
  imports: [BanksModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

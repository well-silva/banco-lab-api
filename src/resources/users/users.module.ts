import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [AccountsModule],
})
export class UsersModule {}

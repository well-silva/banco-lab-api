import { Controller, Post, Body, Get, Request } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Authenticate } from '../../decorators/authenticate.decorator';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Authenticate()
  @Get()
  getBalance(@Request() req: Request) {
    const userId = req['sub'];

    return this.accountsService.getBalance(userId);
  }

  @Authenticate()
  @Post('deposit')
  async deposit(@Body() body: { amount: number }, @Request() req: Request) {
    const userId = req['sub'];

    return this.accountsService.deposit(userId, body.amount);
  }

  @Authenticate()
  @Post('withdraw')
  async withdraw(@Body() body: { amount: number }, @Request() req: Request) {
    const userId = req['sub'];

    return this.accountsService.withdraw(userId, body.amount);
  }
}

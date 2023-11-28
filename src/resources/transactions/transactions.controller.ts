import { Controller, Post, Body, Request } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Authenticate } from '../../decorators/authenticate.decorator';
import { AccountsService } from '../accounts/accounts.service';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly accountsService: AccountsService,
  ) {}

  @Authenticate()
  @Post()
  async tranfer(
    @Request() req: Request,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    const userId = req['user'].sub;
    const { value, account, agency } = createTransactionDto;

    const transaction = await this.transactionsService.create({
      value,
      originUserId: userId,
      account,
      agency,
    });

    return transaction;
  }
}

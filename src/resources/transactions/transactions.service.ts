import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionType } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly prisma: PrismaService,
  ) {}
  async create(params: {
    value: number;
    originUserId: string;
    agency: string;
    account: string;
  }) {
    const { value, originUserId, agency, account } = params;

    const userAccount =
      await this.accountsService.findOneByUserId(originUserId);

    if (userAccount.balance < value) {
      throw new BadRequestException('Saldo insuficiente');
    }

    const userAccountDestiny =
      await this.accountsService.findOneByAccountAndAgency(account, agency);

    if (!userAccountDestiny) {
      throw new BadRequestException('Conta de destino não encontrada');
    }

    await this.accountsService.updateBalance(
      userAccount.id,
      value,
      TransactionType.BALANCE_OUT,
    );

    await this.accountsService.updateBalance(
      userAccountDestiny.id,
      value,
      TransactionType.BALANCE_IN,
    );

    await this.prisma.transaction.create({
      data: {
        type: TransactionType.BALANCE_IN,
        value,
        accountId: userAccount.id,
      },
    });

    await this.prisma.transaction.create({
      data: {
        type: TransactionType.BALANCE_OUT,
        value,
        accountId: userAccountDestiny.id,
      },
    });
  }
}

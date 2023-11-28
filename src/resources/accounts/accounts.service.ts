import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionType } from '../transactions/dto/create-transaction.dto';

@Injectable()
export class AccountsService {
  constructor(readonly prisma: PrismaService) {}
  create(createAccountDto: CreateAccountDto) {
    return this.prisma.account.create({ data: createAccountDto });
  }

  async findOneByUserId(id: string) {
    return this.prisma.account.findFirst({ where: { userId: id } });
  }

  async findOneByAccountAndAgency(account: string, agency: string) {
    return this.prisma.account.findFirst({ where: { account, agency } });
  }

  async updateBalance(id: string, value: number, type: string) {
    let { balance } = await this.prisma.account.update({
      where: { id },
      data: { balance: value },
    });

    if (type === 'BALANCE_IN') {
      balance = value + balance;

      await this.prisma.account.update({
        where: { id },
        data: { balance },
      });

      return;
    }

    balance = balance - value;

    return;
  }

  async getBalance(id: string) {
    const { balance } = await this.prisma.account.findFirst({
      where: { userId: id },
    });
    return balance;
  }

  async deposit(userId: string, amount: number) {
    const { balance, id: accountId } = await this.prisma.account.findFirst({
      where: { userId },
    });

    const newBalance = balance + amount;

    await this.prisma.account.update({
      where: { id: accountId },
      data: { balance: newBalance },
    });

    await this.prisma.transaction.create({
      data: {
        type: TransactionType.DEPOSIT,
        value: amount,
        accountId,
      },
    });

    return { balance: newBalance };
  }

  async withdraw(userId: string, amount: number) {
    const { balance, id: accountId } = await this.prisma.account.findFirst({
      where: { userId },
    });

    if (balance < amount) {
      throw new BadRequestException('Saldo insuficiente');
    }

    const newBalance = balance - amount;

    await this.prisma.account.update({
      where: { id: accountId },
      data: { balance: newBalance },
    });

    await this.prisma.transaction.create({
      data: {
        type: TransactionType.WITHDRAW,
        value: amount,
        accountId,
      },
    });

    return { balance: newBalance };
  }
}

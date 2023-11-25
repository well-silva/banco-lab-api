import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AccountsService } from '../accounts/accounts.service';
import { AccountType } from '../accounts/dto/create-account.dto';
import { randomInt } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    readonly prisma: PrismaService,
    private readonly accountsService: AccountsService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { id: userId } = await this.prisma.user.create({
      data: createUserDto,
    });

    await this.accountsService.create({
      balance: 0,
      type: AccountType.CORRENTE,
      userId,
      account: randomInt(100000).toString(),
      agency: randomInt(1000).toString(),
    });

    return userId;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }
}

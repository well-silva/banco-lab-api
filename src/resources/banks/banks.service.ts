import { Injectable } from '@nestjs/common';
import { CreateBankDto } from './dto/create-bank.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BanksService {
  constructor(private readonly prisma: PrismaService) {}
  create(createBankDto: CreateBankDto) {
    return this.prisma.bank.create({ data: createBankDto });
  }

  findAll() {
    return this.prisma.bank.findMany();
  }

  findOne(id: string) {
    return this.prisma.bank.findUnique({ where: { id } });
  }
}

export class CreateTransactionDto {
  value: number;
  account: string;
  agency: string;
  type?: TransactionType;
}

export enum TransactionType {
  BALANCE_IN = 'BALANCE_IN',
  BALANCE_OUT = 'BALANCE_OUT',
  PAYMENT = 'PAYMENT',
  WITHDRAW = 'WITHDRAW',
  DEPOSIT = 'DEPOSIT',
}

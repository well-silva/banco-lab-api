export class CreateAccountDto {
  balance: number;
  type: AccountType;
  userId: string;
  account: string;
  agency: string;
}

export enum AccountType {
  POUPANCA = 'poupanca',
  CORRENTE = 'corrente',
}

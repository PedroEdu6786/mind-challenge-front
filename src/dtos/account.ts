export interface IAccount {
  id?: number
  accountName: string
  clientName: string
  headOfOperation: string
}

export interface IAccountFetch extends IAccount {
  token: string
}

export class UserErrror extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserError';
  }
}

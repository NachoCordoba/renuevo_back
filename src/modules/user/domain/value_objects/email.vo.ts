export class Email {
  constructor(private readonly _email: string) {}

  static isValidEmailFormat(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  get value(): string {
    return this._email;
  }
}

export class UUID {
  constructor(private _uuid: string) {}

  get value(): string {
    return this._uuid;
  }
}

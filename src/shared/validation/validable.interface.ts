export interface IValidable {
  validate<T extends object>(dto: T): Promise<void>;
}

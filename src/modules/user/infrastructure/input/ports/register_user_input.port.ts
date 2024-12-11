export interface RegisterUserInputPort<Input, Output> {
  handle(event: Input): Promise<Output>;
}

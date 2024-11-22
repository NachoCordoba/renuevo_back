export class UserDTO {
  constructor(
    public id: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public password: string
  ) {}
}

export class UserDTO {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public first_name: string,
    public last_name: string
  ) {}
}

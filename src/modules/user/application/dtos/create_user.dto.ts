type ICreateUser = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export class CreateUserDTO {
  public email: string;
  public firstName: string;
  public lastName: string;
  public password: string;
  constructor(createUser: ICreateUser) {
    this.email = createUser.email;
    this.firstName = createUser.firstName;
    this.lastName = createUser.lastName;
    this.password = createUser.password;
  }
}

import { IsEmail, IsString, MinLength } from "class-validator";

type RegisterUser = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

export class RegisterUserDTO {
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(3)
  public password: string;

  @IsString()
  @MinLength(3)
  public first_name: string;

  @IsString()
  @MinLength(3)
  public last_name: string;

  constructor(registerUser: RegisterUser) {
    this.email = registerUser.email;
    this.password = registerUser.password;
    this.first_name = registerUser.first_name;
    this.last_name = registerUser.last_name;
  }
}

import { IRequest, RequestDTO } from "@/shared/dtos/request.dto";
import { CreateUserDTO } from "@/user/application/dtos/create_user.dto";

type ICreateUserRequest = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

export class CreateUserRequestDTO extends RequestDTO<ICreateUserRequest> {
  constructor(request: IRequest<ICreateUserRequest>) {
    super(request);
  }

  public toApplicationDTO(): CreateUserDTO {
    const createUserRequest = this.getBody();
    return new CreateUserDTO(
      createUserRequest.email,
      createUserRequest.first_name,
      createUserRequest.last_name,
      createUserRequest.password
    );
  }
}

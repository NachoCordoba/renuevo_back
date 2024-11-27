import { IUseCase } from "@/shared/interfaces/use_case.interface";
import { RegisterUserInputPort } from "../ports/register_user_input.port";
import { CreateUserDTO } from "@/user/application/dtos/create_user.dto";
import { UserDTO } from "@/user/application/dtos/user.dto";
import { IRequest, RequestDTO } from "@/shared/dtos/request.dto";
import { ResponseDTO } from "@/shared/dtos/response.dto";
import { Exception } from "@/shared/exceptions/exception";
import { HttpStatus } from "@/shared/enum/http_status.enum";
import { ExceptionDTO } from "@/shared/dtos/exception.dto";
import { UnexpectedException } from "@/shared/exceptions/unexpected.exception";

interface RegisterUserLambdaDependencies {
  useCase: IUseCase<CreateUserDTO, UserDTO>;
}

export class RegisterUserLambdaAdapter
  implements
    RegisterUserInputPort<IRequest<CreateUserDTO>, ResponseDTO<UserDTO>>
{
  constructor(private readonly _dependencies: RegisterUserLambdaDependencies) {}

  async handle(event: IRequest<CreateUserDTO>): Promise<ResponseDTO<UserDTO>> {
    const response = new ResponseDTO();
    try {
      const createUserDTO: CreateUserDTO = new CreateUserDTO(
        RequestDTO.fromLambdaEvent(event).validateEmptyBody().getBody()
      );
      const { id, ...attributes } = await this._dependencies.useCase.execute(
        createUserDTO
      );
      return response
        .setData({
          type: "user",
          id: id,
          attributes: attributes,
        })
        .setStatus(HttpStatus.CREATED);
    } catch (err: Exception | unknown) {
      if (err instanceof Exception)
        return response.addError(err).setStatus(err.status);
      const unexpectedException = new UnexpectedException(err as Error);
      return response
        .addError(unexpectedException)
        .setStatus(unexpectedException.status);
    }
  }
}

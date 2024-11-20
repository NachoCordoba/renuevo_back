import { IValidable } from "@/shared/validation/validable.interface";
import { UserService } from "@/user/application/services/user.service";
import { UserHttpPort } from "../ports/user_http.port";
import { RequestDTO } from "@/shared/dtos/request.dto";
import { RegisterUserDTO } from "@/user/application/dtos/register_user.dto";
import { ResponseDTO } from "@/shared/dtos/response.dto";
import { UserDTO } from "@/user/application/dtos/user.dto";
import { HttpStatus } from "@/shared/enums/http_status.enum";
import { ExceptionManager } from "@/shared/exceptions/exception_manager";
import { Exception } from "@/shared/exceptions/exception";

interface RegisterUserHttpDependencies {
  userService: UserService;
  validationService: IValidable;
}

export class RegisterUserHttpAdapter
  implements UserHttpPort<RequestDTO<RegisterUserDTO>, ResponseDTO<UserDTO>>
{
  constructor(private _dependencies: RegisterUserHttpDependencies) {}

  async handle(
    req: RequestDTO<RegisterUserDTO>
  ): Promise<ResponseDTO<UserDTO>> {
    try {
      const requestBody = new RegisterUserDTO(req.getBody());
      await this._dependencies.validationService.validate(requestBody);
      const registeredUser = await this._dependencies.userService.register(
        requestBody
      );
      const { id, ...attributes } = registeredUser;
      return new ResponseDTO({
        statusCode: HttpStatus.CREATED,
        body: {
          data: {
            type: "user",
            id: id,
            attributes: attributes,
          },
          errors: [],
        },
      });
    } catch (err: any) {
      if (err instanceof ExceptionManager) {
        return new ResponseDTO({
          statusCode: err.getPrimordialStatus(),
          body: {
            data: {},
            errors: err.getExceptions().map((exception) => exception.toJson()),
          },
        });
      }

      if (err instanceof Exception) {
        return new ResponseDTO({
          statusCode: err.getStatus(),
          body: {
            data: {},
            errors: [err.toJson()],
          },
        });
      }

      console.log(err);
      throw new Error("Unhandled Error");
    }
  }
}

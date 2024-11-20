import {
  APIGatewayEvent,
  APIGatewayProxyEvent,
  APIGatewayProxyResultV2,
} from "aws-lambda";
import { UserHttpPort } from "../ports/user_http.port";
import { RegisterUserHttpAdapter } from "./register_user_http.adapter";
import { ApiGatewayMapper } from "@/shared/mappers/apigateway.mapper";
import { RegisterUserDTO } from "@/user/application/dtos/register_user.dto";

interface RegisterUserApiGatewayDependencies {
  registerUserHttpAdapter: RegisterUserHttpAdapter;
}

export class RegisterUserApiGatewayAdapter
  implements UserHttpPort<APIGatewayEvent, APIGatewayProxyResultV2>
{
  constructor(private _dependencies: RegisterUserApiGatewayDependencies) {}

  async handle(req: APIGatewayProxyEvent): Promise<APIGatewayProxyResultV2> {
    const mappedRequest = ApiGatewayMapper.toHttpRequest<RegisterUserDTO>(req);
    const result = await this._dependencies.registerUserHttpAdapter.handle(
      mappedRequest
    );
    return ApiGatewayMapper.toApiGatewayResponse(result);
  }
}

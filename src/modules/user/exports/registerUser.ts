import { ClassValidatorAdapter } from "@/shared/validation/class_validator.adapter";
import { UserDynamoRepositoryAdapter } from "../infrastructure/adapters/user_dynamo_repository.adapter";
import { UserService } from "../application/services/user.service";
import { RegisterUserHttpAdapter } from "../infrastructure/adapters/register_user_http.adapter";
import { RegisterUserApiGatewayAdapter } from "../infrastructure/adapters/register_user_apigateway.adapter";
import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from "aws-lambda";

const userRepository = new UserDynamoRepositoryAdapter({
  tableName: process.env.USER_TABLE,
});

const validationService = new ClassValidatorAdapter();

const userService = new UserService({
  userRepository: userRepository,
});

const registerUserHttpAdapter = new RegisterUserHttpAdapter({
  userService: userService,
  validationService: validationService,
});

const registerUserApiGatewayAdapter = new RegisterUserApiGatewayAdapter({
  registerUserHttpAdapter: registerUserHttpAdapter,
});

export const handler = async (
  req: APIGatewayProxyEvent
): Promise<APIGatewayProxyResultV2> =>
  await registerUserApiGatewayAdapter.handle(req);

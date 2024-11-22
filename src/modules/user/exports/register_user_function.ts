import { IRequest } from "@/shared/dtos/request.dto";
import { CreateUserDTO } from "../application/dtos/create_user.dto";
import { RegisterUserLambdaAdapter } from "../infrastructure/adapters/register_user_lambda.adapter";
import { RegisterUserCase } from "../application/use_cases/register_user.use_case";
import { UserDynamoRepositoryAdapter } from "../infrastructure/adapters/user_dynamo_repository.adapter";
import { ArgonHashService } from "@/shared/services/argon_hash.service";

const userRepository = new UserDynamoRepositoryAdapter({
  tableName: process.env.USER_TABLE,
});

const hashService = new ArgonHashService();

const registerUserCase = new RegisterUserCase({
  userRepository: userRepository,
  hashService: hashService,
});

const registerUserLambdaAdapter = new RegisterUserLambdaAdapter({
  useCase: registerUserCase,
});

export const handler = (req: IRequest<CreateUserDTO>) =>
  registerUserLambdaAdapter.handle(req);

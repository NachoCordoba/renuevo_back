import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
  QueryCommand,
  QueryCommandInput,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { UserRepositoryPort } from "../ports/user_repository.port";
import { UserDTO } from "@/user/application/dtos/user.dto";

interface UserDynamoRepositoryDependencies {
  tableName: string;
  dynamoClient?: DynamoDBClient;
}

export class UserDynamoRepositoryAdapter implements UserRepositoryPort {
  private tableName: string;
  private dynamoClient: DynamoDBClient;

  constructor(dependencies: UserDynamoRepositoryDependencies) {
    this.tableName = dependencies.tableName;
    this.dynamoClient = dependencies.dynamoClient || new DynamoDBClient();
  }

  async findByEmail(email: string): Promise<UserDTO | null> {
    const queryCommandParams: QueryCommandInput = {
      TableName: this.tableName,
      IndexName: "EmailIndex",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": { S: email },
      },
    };
    const queryCommand = new QueryCommand(queryCommandParams);
    const response = await this.dynamoClient.send(queryCommand);

    if (!response.Items?.[0]) return null;

    return unmarshall(response.Items[0]) as UserDTO;
  }

  async save(user: UserDTO): Promise<UserDTO> {
    const params: PutItemCommandInput = {
      TableName: this.tableName,
      Item: marshall(user, { convertClassInstanceToMap: true }),
    };
    const command: PutItemCommand = new PutItemCommand(params);
    await this.dynamoClient.send(command);
    return user;
  }
}

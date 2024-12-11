import { FindUserByEmailPort } from "../db/ports/find_user_by_email.port";
import { SaveUserPort } from "../db/ports/save_user.port";
import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
  QueryCommand,
  QueryCommandInput,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { UserDTO } from "@/user/application/dtos/user.dto";
import { UserFactory } from "@/user/domain/factories/user.factory";
import { UserEntity } from "@/user/domain/entities/user.entity";

interface UserDynamoRepositoryDependencies {
  tableName: string;
  dynamoClient?: DynamoDBClient;
}

export class UserDynamoRepositoryAdapter
  implements SaveUserPort, FindUserByEmailPort
{
  private _tableName: string;
  private _dynamoClient: DynamoDBClient;

  constructor(dependencies: UserDynamoRepositoryDependencies) {
    this._tableName = dependencies.tableName;
    this._dynamoClient = dependencies.dynamoClient || new DynamoDBClient();
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const queryCommandParams: QueryCommandInput = {
      TableName: this._tableName,
      IndexName: "EmailIndex",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": { S: email },
      },
    };
    const queryCommand = new QueryCommand(queryCommandParams);
    const response = await this._dynamoClient.send(queryCommand);

    if (!response.Items?.[0]) return null;

    return UserFactory.fromPersist(unmarshall(response.Items[0]) as UserDTO);
  }

  async save(user: UserEntity): Promise<void> {
    const params: PutItemCommandInput = {
      TableName: this._tableName,
      Item: marshall(user, { convertClassInstanceToMap: true }),
    };
    const command: PutItemCommand = new PutItemCommand(params);
    await this._dynamoClient.send(command);
  }
}

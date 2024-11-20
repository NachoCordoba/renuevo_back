import { APIGatewayEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import { RequestDTO } from "../dtos/request.dto";
import { ResponseDTO } from "../dtos/response.dto";

export class ApiGatewayMapper {
  static toHttpRequest<T>(req: APIGatewayEvent): RequestDTO<T> {
    return new RequestDTO<T>({
      path: req.path,
      method: req.httpMethod,
      headers: req.headers,
      body: req.body,
      queryParams: req.queryStringParameters,
      pathParams: req.pathParameters,
    });
  }

  static toApiGatewayResponse<T>(res: ResponseDTO<T>): APIGatewayProxyResultV2 {
    return {
      body: res.getBodyString(),
      statusCode: res.getStatusCode(),
      headers: res.getHeaders(),
    };
  }
}

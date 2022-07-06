import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { EntityNotFoundError } from "typeorm";


@Catch(EntityNotFoundError)
export class PostgresErrorFilter<Error> implements ExceptionFilter {
  public catch(exception: Error, host: ArgumentsHost) {
    const { request, response } = this.getExpressData(host);
    const responseError = this.getResponseError(exception, request);
    response.status(responseError.statusCode).json(responseError);
  }

  private getExpressData(host: ArgumentsHost) {
    // ! http specific
    const httpContext = host.switchToHttp();
    // ! express specific
    const response = httpContext.getResponse<Response>();
    const request = httpContext.getRequest<Request>();
    return { request, response };
  }

  private getResponseError(exception: Error, request: Request) {
    const status = HttpStatus.NOT_FOUND;

    const responseError = {
      statusCode: status,
      message: "Entity not found",
      path: request.url,
    };
    return responseError;
  }
}
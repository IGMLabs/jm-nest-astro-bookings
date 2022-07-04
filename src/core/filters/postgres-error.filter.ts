import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";


@Catch()
export class PostgresErrorFilter<Error> implements ExceptionFilter {
  public catch(exception: Error, host: ArgumentsHost) {}
}
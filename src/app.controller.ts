import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseFilters, ValidationPipe } from "@nestjs/common";
import { AppService } from "./app.service";
import { PositiveNumberPipe } from "./core/pipes/positive-number.pipe";
import { ClientDto } from "./models/client.dto";
import { Client } from "./models/client.interface";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("")
  public getHello(): string {
    return this.appService.getHello();
  }

  @Post("")
  public postHello(@Body() payload: unknown): string {
    const type = typeof payload;
    const nameString = JSON.stringify(payload);
    return `Body: ${payload} of type ${type}; ${nameString}`;
  }

  @Post("name")
  public postHelloName(@Body() payload: { name: string }): string {
    return `Hello ${payload.name}`;
  }

  @Get("/test")
  public getTest(): string {
    return "Hola Test";
  }

  @Get("/param/:id")
  public getParam(@Param("id") id: string): string {
    const type = typeof id;
    return `Param: ${id} of type ${type}`;
  }

  @Get("/square/:someParam")
  public getSquare(@Param("someParam", PositiveNumberPipe) someParam: number): string {
    const square = someParam * someParam;
    return `Square of ${someParam} is ${square}`;
  }

  @Get("/square/Nan/:someParam")
  public getSquarePipe(@Param("someParam") someParam: string): string {
    const someNumber = parseInt(someParam);
    if (isNaN(someNumber)) throw new HttpException(`${someParam} is not a number`, HttpStatus.BAD_REQUEST);
    const type = typeof someNumber;
    const square = someNumber * someNumber;
    return `Square of ${someNumber} of type ${type} is ${square}`;
  }

  @Get("/square/pipe/:someParam")
  public getSquareIntPipe(@Param("someParam", ParseIntPipe) someNumber: number): string {
    const type = typeof someNumber;
    const square = someNumber * someNumber;
    return `Square of ${someNumber} of type ${type} is ${square}`;
  }

  @Get("/multiply/:someNumber/:otherNumber")
  public getMultiply(
    @Param("someNumber", ParseIntPipe) someNumber: number,
    @Param("otherNumber", ParseIntPipe) otherNumber: number,
  ): number {
    const multiply = someNumber * otherNumber;
    return multiply;
  }

  @Get("/multiply/query")
  public getMultiplyQuery(
    @Query("a", ParseIntPipe) a: number,
    @Query("b", ParseIntPipe) b: number,
  ): number {
    return this.appService.multiply(a, b);
  }

  @Get("/divide/query")
  @UseFilters()
  public getDivisionQuery(
    @Query("dividendo", ParseIntPipe) dividendo: number,
    @Query("divisor", ParseIntPipe) divisor: number,
  ): number {
    try{
      return this.appService.divide( dividendo, divisor );
    }catch(error){
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get("/raiz/query")
  public getRaizQuery(
    @Query("number", ParseIntPipe) number: number,
  ): number {
    try{
      return this.appService.raiz( number );
    }catch(error){
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post("client")
  public postClient(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    payload: ClientDto,
  ): Client {
    return this.appService.saveClient(payload);
  }

  @Put("client/:id")
  public putClient(@Param("id") clientId: string, @Body() payload: Client): Client {
    try {
      return this.appService.updateClient(clientId, payload);
    } catch (error) {
      const message: string = error.message;
      if (message.startsWith("NOT FOUND:")) throw new HttpException(message, HttpStatus.NOT_FOUND);
      else throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }


}

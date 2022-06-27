import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
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
  public getSquare(@Param("someParam") someParam: number): string{
    const type = typeof someParam;
    const square = someParam * someParam;
    return `Square of ${someParam} is ${square}`;
  }

  @Get("/square/Nan/:someParam")
  public getSquarePipe(@Param("someParam") someParam: string): string{
    const someNumber = parseInt(someParam);
    if(isNaN(someNumber)) throw new HttpException(`${someParam} is not a number`, HttpStatus.BAD_REQUEST);
    const type = typeof someNumber;
    const square = someNumber * someNumber;
    return `Square of ${someNumber} of type ${type} is ${square}`;
  }

  @Get("/square/pipe/:someParam")
  public getSquareIntPipe(@Param("someParam", ParseIntPipe) someNumber: number): string{
    const type = typeof someNumber;
    const square = someNumber * someNumber;
    return `Square of ${someNumber} of type ${type} is ${square}`;
  }
  
}
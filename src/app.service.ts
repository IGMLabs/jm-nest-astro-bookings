import { Injectable } from "@nestjs/common";

export class AppServiceBase {
  getHello(): string {
    return "Hello World!";
  }

  multiply(someNumber:number, otherNumber: number): number{
    const multiply = someNumber * otherNumber;
    return multiply;
  }

  divide(dividendo:number, divisor: number): number{
    if(divisor === 0 ) throw new Error("Divisor can't be 0")
    const divide = dividendo / divisor;
    return divide;
  }

  raiz(number :number): number{
    if(number < 0 ) throw new Error("Number can't be less than 0")
    const raiz = Math.sqrt(number);
    return raiz;
  }
}

@Injectable()
export class AppService extends AppServiceBase{
  getHello(): string {
    return "Hello World!";
  }
}

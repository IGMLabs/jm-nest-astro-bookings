import { Injectable } from "@nestjs/common";
import { Client } from "./client.interface";

export class AppServiceBase {
  public getHello(): string {
    return "Hello World!";
  }

  public multiply(someNumber:number, otherNumber: number): number{
    const multiply = someNumber * otherNumber;
    return multiply;
  }

  public divide(dividendo:number, divisor: number): number{
    if(divisor === 0 ) throw new Error("Divisor can't be 0")
    const divide = dividendo / divisor;
    return divide;
  }

  public raiz(number :number): number{
    if(number < 0 ) throw new Error("Number can't be less than 0")
    const raiz = Math.sqrt(number);
    return raiz;
  }

  public saveClient(client: Client): Client {
    client.id = Math.random().toString();
    return client;
  }

  public updateClient(clientId: string, client: Client): Client {
    if (clientId !== "") {
      throw new Error("NOT FOUND: " + clientId);
    }
    return client;
  }
}

@Injectable()
export class AppService extends AppServiceBase{
  getHello(): string {
    return "Hello World!";
  }
}

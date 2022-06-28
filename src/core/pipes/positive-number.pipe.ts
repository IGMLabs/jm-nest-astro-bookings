import { ArgumentMetadata, HttpException, HttpStatus, Injectable, ParseIntPipe, PipeTransform } from '@nestjs/common';

@Injectable()
export class PositiveNumberPipe implements PipeTransform {
  public async transform(value: any, metadata: ArgumentMetadata) {
    const numberValue = await new ParseIntPipe().transform(value, metadata);
    if(numberValue < 0 ){
      throw new HttpException(`${value} is not positive`, HttpStatus.BAD_REQUEST);
    }
    return numberValue;
  }
}

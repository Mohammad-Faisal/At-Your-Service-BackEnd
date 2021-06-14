import { HttpException, HttpStatus } from '@nestjs/common';

export default class CommonException extends HttpException{
  errorCode  = 10000;
  errorMessage  = "";
  constructor( errorCode : number , errorMessage? : string) {
    super("Some Error Occurred", 460);
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
  }
}
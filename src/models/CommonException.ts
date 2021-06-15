import { HttpException } from '@nestjs/common';

export default class CommonException extends HttpException {
    errorCode = 10000;
    errorMessage = '';
    constructor(errorCode: number, httpStatus: number, errorMessage?: string) {
        super('Some Error Occurred', httpStatus ? httpStatus : 460);
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}

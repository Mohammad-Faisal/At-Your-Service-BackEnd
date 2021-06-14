import { BaseResponse } from "./BaseResponse";

export class ErrorResponse extends BaseResponse {

    private path : string = "";
    private timestamp : string = "";
    private errorCode : number = 0;
    public rawErrors: any[] = [];

    constructor(statusCode: number , errorCode : number , message : string , path :string ,timestamp:any ) {
        super();
        this.status = "error";
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.message = message;
        this.path = path;
        this.timestamp = timestamp
    }
}
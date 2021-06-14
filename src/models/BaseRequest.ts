import { IsNotEmpty } from 'class-validator';

export class BaseRequest {

    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    userType: string;

    limit: string;

    pageId: string;

}
import BaseRequest from "../../utils/BaseRequest";
import {UserType} from "../../../constants/GeneralConstants";

export class SignUpRequest extends BaseRequest{

    name:string='';
    email:string='';
    type:UserType=UserType.SERVICE_PROVIDER;
    password:string=''

    constructor(values:SignUpInput) {
        super();
        this.name = values.name
        this.email = values.email
        this.type = values.type
        this.password = values.password
    }
}

export interface SignUpInput  {
    name: string;
    email: string;
    password: string;
    type: UserType;
}

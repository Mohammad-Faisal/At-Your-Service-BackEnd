import BaseRequest from "../../utils/BaseRequest";

export  class SignInRequest extends BaseRequest{

    email:string='';
    password:string=''

    constructor(values:SignInInputs) {
        super();
        this.update(values)
    }
}

export interface SignInInputs  {
    email: string;
    password: string;
}

import BaseRequest from "../../utils/BaseRequest";
import {OrderStatus} from "../../../constants/GeneralConstants";

export  class ChangeOrderStatusRequest extends BaseRequest{

    orderId:number=-1;
    changedStatus:OrderStatus=OrderStatus.ACCEPTED;
    reason:string=''

    constructor(orderId:number , changedStatus:OrderStatus , reason='') {
        super();
        this.orderId = orderId
        this.changedStatus = changedStatus
        this.reason = reason
    }
}

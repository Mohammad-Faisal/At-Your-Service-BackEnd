import BaseRequest from "../../utils/BaseRequest";

export  class PlaceOrderRequest extends BaseRequest{

    serviceId:number=-1;

    constructor(serviceId:number) {
        super();
        this.serviceId =serviceId
    }
}


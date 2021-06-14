import BaseRequest from "../../utils/BaseRequest";

export  class GiveReviewRequest extends BaseRequest{

    orderId:number=-1;
    rating:number= 0.0;
    review:string='';

    constructor(orderId:number, rating: number, review:string) {
        super();
        this.orderId = orderId
        this.rating = rating
        this.review = review
    }
}


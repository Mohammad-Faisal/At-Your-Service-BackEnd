import BaseRequest from '../../utils/BaseRequest';
import { OrderStatus, UserType } from '../../../constants/GeneralConstants';

export class GetOrdersRequest extends BaseRequest {
    status: OrderStatus | null = null;

    constructor(status?: OrderStatus) {
        super();
        if (status) this.status = status;
    }
}

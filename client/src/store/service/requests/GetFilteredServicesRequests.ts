import BaseRequest from '../../utils/BaseRequest';
import { ServiceType } from '../../../constants/GeneralConstants';

export class GetFilteredServicesRequests extends BaseRequest {
    minRating: number = 0;
    maxRating: number = 5.0;
    minRate: number = 0;
    maxRate: number = 999;
    type: ServiceType | null = null;

    constructor(values?: FilterServiceInputs) {
        super();
        if (values) this.update(values);
    }
}

export interface FilterServiceInputs {
    minRating: number;
    maxRating: number;
    minRate: number;
    maxRate: number;
    type: ServiceType | null;
}

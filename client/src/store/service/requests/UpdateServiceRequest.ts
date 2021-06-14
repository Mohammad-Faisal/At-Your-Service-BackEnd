import BaseRequest from '../../utils/BaseRequest';
import { ServiceType } from '../../../constants/GeneralConstants';

export class UpdateServiceRequest extends BaseRequest {
    id: number;
    name: string = '';
    description: string = '';
    hourlyRate: string = '';
    preferredHour: string = '';
    type: ServiceType = ServiceType.OTHERS;

    constructor(values: ServiceInputs) {
        super();
        this.update(values);
    }
}

export interface ServiceInputs {
    name: string;
    description: string;
    hourlyRate: string;
    preferredHour: string;
    type: ServiceType;
}

import BaseRequest from '../../utils/BaseRequest';

export class DeleteServiceRequest extends BaseRequest {
    id: number;
    constructor(id: number) {
        super();
        this.id = id;
    }
}

import { BaseModel } from 'sjs-base-model';

export default class BaseRequest extends BaseModel {
    data = {};

    constructor(data?: any) {
        super();
        if (data) this.data = data;
    }
}

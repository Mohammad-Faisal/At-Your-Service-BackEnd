import { BaseModel } from 'sjs-base-model'

export default class BaseRequest extends BaseModel {
    data = {}
    headers = {
        authtoken: localStorage.getItem('JWT_TOKEN'),
        'accept-language': 'en',
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }

    constructor(data?:any) {
        super()
        if (data) this.data = data
    }
}

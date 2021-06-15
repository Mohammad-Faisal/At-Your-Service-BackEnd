import { BaseModel } from 'sjs-base-model'

export default class ServerGeneralizedResponse extends BaseModel {
    data = {}
    error = {}
    errors = []
    requestId = 0
    status = 200
    statusCode = 200
    message = ''
    errorCode = ''
    path = ''
    timestamp = ''

    constructor(data:any) {
        super()
        this.update(data)
    }
}

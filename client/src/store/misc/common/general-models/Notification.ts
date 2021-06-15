import {NotificationType} from "./NotificationType";

export class Notification {
    message: string="";
    type:NotificationType = NotificationType.SUCCESS;
    status:boolean = true;

    constructor(message:string,  type: NotificationType) {
        this.message = message;
        this.type = type;
    }
}


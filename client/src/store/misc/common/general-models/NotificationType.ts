export enum NotificationType{
    DEFAULT,
    SUCCESS,
    ERROR,
    WARNING
}

export interface INotification {
    message: string;
    status:boolean;
    type:NotificationType;
}

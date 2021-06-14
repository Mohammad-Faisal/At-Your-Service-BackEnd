export enum ModalType {
    SUCCESS ,
    ERROR
}

export enum UserType {
    UNAUTHENTICATED = 'UNAUTHENTICATED',
    GENERAL_USER = 'GENERAL_USER',
    SERVICE_PROVIDER = 'SERVICE_PROVIDER',
    SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum ServiceType {
    CAR_REPAIR = 'CAR_REPAIR',
    CARPENTRY = 'CARPENTRY',
    CLEANING = 'CLEANING',
    DEMOLITION = 'DEMOLITION',
    HOME_IMPROVEMENT = 'HOME_IMPROVEMENT',
    LANDSCAPING = 'LANDSCAPING',
    MOVING = 'MOVING',
    OTHERS = 'OTHERS',
}

export enum OrderStatus {
    REQUESTED = 'REQUESTED',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    RUNNING = 'RUNNING',
    COMPLETED = 'COMPLETED',
    FINISHED = 'FINISHED',
    UNFINISHED = 'UNFINISHED',
}

export class ApiEndpoints {
    // static BASE_URL:string = 'http://18.141.57.99:3200/api/v1';
    static BASE_URL: string = 'http://localhost:5000/api/v1';

    static user = {
        signIn: `${ApiEndpoints.BASE_URL}/user/signin`,
        signUp: `${ApiEndpoints.BASE_URL}/user/signup`,
    };

    static service = {
        createService: `${ApiEndpoints.BASE_URL}/service/create`,
        updateService: `${ApiEndpoints.BASE_URL}/service/update`,
        deleteService: `${ApiEndpoints.BASE_URL}/service/delete`,
        getDetails: `${ApiEndpoints.BASE_URL}/service/get-details`,
        getServiceByProvider: `${ApiEndpoints.BASE_URL}/service/get-by-user`,
        getFilteredServices: `${ApiEndpoints.BASE_URL}/service/get-filtered-services`,
    };

    static order = {
        placeOrder: `${ApiEndpoints.BASE_URL}/order/place-order`,
        getOrders: `${ApiEndpoints.BASE_URL}/order/get-orders`,
        changeStatus: `${ApiEndpoints.BASE_URL}/order/change-order-status`,
        giveReview: `${ApiEndpoints.BASE_URL}/order/give-review`,
    };
}

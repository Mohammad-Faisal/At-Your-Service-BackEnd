export class ApiEndpoints {
    // static BASE_URL:string = 'http://18.141.57.99:3200/api/v1';
    static BASE_URL: string = 'http://localhost:5000/api/v1';

    static user = {
        signIn: `${ApiEndpoints.BASE_URL}/user/signin`,
        signUp: `${ApiEndpoints.BASE_URL}/user/signup`,
        getUsers: `${ApiEndpoints.BASE_URL}/user/users`,
    };

    static service = {
        baseEndpoint: `${ApiEndpoints.BASE_URL}/service`,
        getDetails: `${ApiEndpoints.BASE_URL}/service/get-details`,
        getFilteredServices: `${ApiEndpoints.BASE_URL}/service/filter`,
    };

    static order = {
        placeOrder: `${ApiEndpoints.BASE_URL}/order/place`,
        getOrders: `${ApiEndpoints.BASE_URL}/order/orders`,
        changeStatus: `${ApiEndpoints.BASE_URL}/order/change-status`,
        giveReview: `${ApiEndpoints.BASE_URL}/order/give-review`,
        getReviews: `${ApiEndpoints.BASE_URL}/order/reviews`,
    };
}

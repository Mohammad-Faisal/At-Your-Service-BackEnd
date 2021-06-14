import axios from 'axios'
import HttpErrorResponseModel from "./HttpErrorResponseModel";

const RequestMethod = {
    Get: 'GET',
    Post: 'POST',
    Put: 'PUT',
    Delete: 'DELETE',
    Options: 'OPTIONS',
    Head: 'HEAD',
    Patch: 'PATCH'
}

export default class HttpUtility {


    static async post(endpoint:string, data:any) {
        const config = data ? { data } : undefined

        return HttpUtility._request(
            {
                url: endpoint,
                method: RequestMethod.Post
            },
            config
        )
    }

    static async _request(restRequest:any, config:any) {
        if (!Boolean(restRequest.url)) {
            console.error(`Received ${restRequest.url} which is invalid for a endpoint url`)
        }

        try {
            const axiosRequestConfig = {
                ...config.data,
                method: restRequest.method,
                url: restRequest.url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Accept: 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin': '*',
                    ...config.data.headers
                }
            }

            const [axiosResponse] = await Promise.all([
                axios(axiosRequestConfig),
                HttpUtility._delay()
            ])
            const { status, data, request } = axiosResponse

            if (data.status !== 'success') {
                return HttpUtility._fillInErrorWithDefaults(
                    {
                        status,
                        message: data.message,
                        errors: data.errors,
                        url: request ? request.responseURL : restRequest.url,
                        raw: axiosResponse
                    },
                    restRequest
                )
            }
            return {
                ...axiosResponse
            }
        } catch (error) {
            if (error.response) {
                const { data } = error.response
                return HttpUtility._fillInErrorWithDefaults(
                    {
                        status: data.status,
                        //message: (data.error? data.error.message : "") ,
                        message: data.message ? data.message : '',
                        code: data.error ? data.error.code : '',
                        errors: data.errors,
                        url: error.request.responseURL,
                        raw: error.response
                    },
                    restRequest
                )
            } else if (error.request) {

                const { status, statusText, responseURL } = error.request

                return HttpUtility._fillInErrorWithDefaults(
                    {
                        status,
                        message: statusText,
                        errors: [statusText],
                        url: responseURL,
                        raw: error.request
                    },
                    restRequest
                )
            }

            return HttpUtility._fillInErrorWithDefaults(
                {
                    status: 0,
                    message: error.message,
                    errors: [error.message],
                    url: restRequest.url,
                    raw: error
                },
                restRequest
            )
        }
    }

    static _fillInErrorWithDefaults(error:any, request:any) {
        const model = new HttpErrorResponseModel()
        model.status = error.status || 0
        model.message = error.message || 'Error requesting data'
        model.code = error.code || 'none'
        // model.errors = error.errors.length ? error.errors : ['Error requesting data'];
        model.url = error.url || request.url
        model.raw = error.raw
        // Remove anything with undefined or empty strings.
        model.errors = model.errors.filter(Boolean)

        return model
    }

    static _delay(duration = 250) {
        return new Promise((resolve) => setTimeout(resolve, duration))
    }
}

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const isClientEnv = typeof window === 'object';
const isEmpty = (x: any) => {
    return [ null, undefined ].indexOf(x) !== -1;
};
const defaultOptions = {
    timeout: 10000,
};

export function toKvp(query: { [key: string]: any } = {}): string {
    return Object
        .keys(query)
        .filter(key => !isEmpty(query[key]))
        .map(key => `${ encodeURIComponent(key) }=${ encodeURIComponent(query[key]) }`)
        .join('&');
}

export interface IFetchOptions {
    include?: boolean,
    origin?: boolean,
}

export function fetch<T>(axiosOptions: AxiosRequestConfig, fetchOptions?: IFetchOptions | boolean): Promise<AxiosResponse<T>> {
    const iConfig = typeof fetchOptions === 'object' ? fetchOptions : { include: !!fetchOptions };
    return new Promise<AxiosResponse>((resolve, reject) => {
        const requestOptions: { [key: string]: any } = {
            withCredentials: false,
            ...axiosOptions
        };

        if (!requestOptions.url) return reject({ status: -1, message: 'url is undefined' });
        if (!requestOptions.method) requestOptions.method = 'GET';
        if (!requestOptions.timeout) requestOptions.timeout = defaultOptions.timeout;
        if (iConfig.include) requestOptions.withCredentials = true;

        if (requestOptions.method.toUpperCase() === 'GET') {
            requestOptions.params = requestOptions.data;
            delete requestOptions.data;
        } else if ([ 'PUT', 'POST', 'DELETE' ].indexOf(requestOptions.method.toUpperCase()) >= 0) {
            if (!requestOptions.headers) requestOptions.headers = {};
            requestOptions.headers['content-type'] = 'application/x-www-form-urlencoded';
            if (isClientEnv) {
                requestOptions.data = (requestOptions.data instanceof window.FormData)
                    ? requestOptions.data : toKvp(requestOptions.data);
            } else {
                requestOptions.data = toKvp(requestOptions.data);
            }
            delete requestOptions.params;
        }
        axios(requestOptions).then(resolve).catch((error: any) => {
            return reject({ status: -500, error });
        });
    });
}

export function fetchGet(url: string, data?: object) {
    return fetch({
        url,
        method: 'GET',
        data,
    }, true).then((res: any) => {
        if (res.status !== 200) return res;
        return res.data;
    });
}

export function fetchPost(url: string, data?: object) {
    return fetch({
        url,
        method: 'POST',
        data,
    }, true).then((res: any) => {
        if (res.status !== 200) return res;
        return res.data;
    });
}

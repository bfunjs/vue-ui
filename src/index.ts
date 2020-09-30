import axios from 'axios';

const isClientEnv = typeof window === 'object';
const isEmpty = (x: any) => {
    return [ null, undefined ].indexOf(x) !== -1;
};
const defaultOptions = {
    timeout: 10000,
};

export enum IMethods {
    GET = 'GET',
    POST = 'POST',
}

export function toKvp(query: { [key: string]: any } = {}): string {
    return Object
        .keys(query)
        .filter(key => !isEmpty(query[key]))
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
        .join('&');
}

export interface IAxiosOptions {
    url: string,
    method?: IMethods,
    timeout?: number,
    params?: object,
    headers?: object,
    withCredentials?: boolean,
    responseType?: string,
}

export interface IFetchOptions {
    include?: boolean,
    origin?: boolean,
}

export interface IFetchResponse {
    status: number,
    message?: string,
    data?: any,
}

export function fetch(axiosOptions: IAxiosOptions = { url: '' }, fetchOptions?: IFetchOptions | boolean): Promise<IFetchResponse> {
    const iConfig = typeof fetchOptions === 'object' ? fetchOptions : { include: !!fetchOptions };
    return new Promise<IFetchResponse>((resolve, reject) => {
        const requestOptions: { [key: string]: any } = {
            withCredentials: false,
            ...axiosOptions
        };

        if (!requestOptions.url) reject({ status: -1, message: 'url is undefined' });
        if (!requestOptions.method) requestOptions.method = IMethods.GET;
        if (!requestOptions.timeout) requestOptions.timeout = defaultOptions.timeout;
        if (iConfig.include) requestOptions.withCredentials = true;

        if (requestOptions.method.toUpperCase() === IMethods.POST) {
            if (!requestOptions.headers) requestOptions.headers = {};
            requestOptions.headers['content-type'] = 'application/x-www-form-urlencoded';
            if (isClientEnv) {
                requestOptions.data = (requestOptions.params instanceof window.FormData)
                    ? requestOptions.params : toKvp(requestOptions.params);
            } else {
                requestOptions.data = toKvp(requestOptions.params);
            }
            delete requestOptions.params;
        }
        axios(requestOptions).then(resolve).catch((err: any) => {
            reject({ status: 404, message: err.stack });
        });
    });
}

export function fetchGet(url: string, params?: object) {
    return fetch({
        url,
        method: IMethods.GET,
        params,
    }, true).then((res: any) => {
        if (res.status !== 200) return res;
        return res.data;
    });
}

export function fetchPost(url: string, params?: object) {
    return fetch({
        url,
        method: IMethods.POST,
        params,
    }, true).then((res: any) => {
        if (res.status !== 200) return res;
        return res.data;
    });
}

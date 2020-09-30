import { fetch, IMethods } from '@bfun/fetch';

const params = {
    url: 'https://registry.npmjs.com/react/16.13.0',
    method: IMethods.GET,
    headers: {}
};
fetch(params).then(res => {
    console.log(res);
});

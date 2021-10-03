import { fetch, fetchGet, fetchPost } from '../src';

test('测试 fetch 函数调用', () => {
    expect.assertions(2);
    const params = {
        url: 'https://registry.npmjs.com/react/16.13.0',
        headers: {},
    };
    return fetch<any>(params)
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.data.version).toBe('16.13.0');
        });
});

test('测试 fetchGet 函数调用', () => {
    expect.assertions(1);
    return fetchGet('https://registry.npmjs.com/react/latest')
        .then(res => {
            expect(res.name).toBe('react');
        });
});


test('测试 fetchPost 函数调用', () => {
    expect.assertions(1);
    return fetchPost('https://404.bfunjs.com/404', { source: 'fetch' })
        .catch(res => {
            expect(res.status).toBe(-500);
        });
});

test('测试 fetch 参数异常', async () => {
    expect.assertions(1);
    return fetch({})
        .catch(res => {
            expect(res.status).toBe(-1);
        });
});

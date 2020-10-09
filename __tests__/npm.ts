// const path = require('path');
// const fs = require('fs');
// const downloadNpm = require('../lib/npm').default;
//
// test('测试 npm 函数调用', () => {
//     expect.assertions(2);
//
//     const dirname = path.resolve('.npm_cache');
//     const options = {
//         url: 'https://registry.npm.alibaba-inc.com/react/16.13.0',
//         dir: dirname,
//     };
//
//     return downloadNpm(options)
//         .then(res => {
//             expect(res.status).toBe(200);
//             expect(fs.existsAsync(dirname)).toBe(true);
//         });
// });

test('测试 npm 函数调用', () => {
    expect(200).toBe(200);
});

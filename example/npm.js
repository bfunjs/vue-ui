const path = require('path');
const fs = require('fs');
const downloadNpm = require('../dist/lib/npm').default;

const dirname = path.resolve('pkg');
const options = {
    url: 'https://registry.npm.alibaba-inc.com/react/16.13.0',
    dir: dirname,
};
downloadNpm(options)
    .then(res => {
        const status = fs.existsAsync(dirname);
        console.log(status);
    });

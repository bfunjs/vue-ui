import { fetch, fetchGet } from '.';
import * as path from 'path';
import zlib from 'zlib';
// @ts-ignore
import tarfs from 'tar-fs';
// @ts-ignore
import vfs from 'vinyl-fs';
// @ts-ignore
import map from 'map-stream';
// @ts-ignore
import rimraf from 'rimraf';

export interface IFetchOptions {
    url: string,
    dir: string,
    tmpDir?: string,
}

function rewriteDotFiles(file: any, cb: any) {
    file.path = file.path.replace(/_(\.\w+)$/, '$1');
    cb(null, file);
}

export default async function (options: IFetchOptions) {
    const tmpDir = path.join(__dirname, options.tmpDir || 'tmp');
    const output = path.resolve(options.dir);

    const npmInfo = await fetchGet(options.url);
    const npmRepo = await fetch<any>({
        url: npmInfo.dist.tarball,
        responseType: 'stream',
    });

    await new Promise(resolve => npmRepo.data
        .pipe(zlib.createGunzip())
        .pipe(tarfs.extract(tmpDir))
        .on('finish', () => {
            vfs.src('**/*', { cwd: path.join(tmpDir, 'package'), dot: true })
                .pipe(map(rewriteDotFiles))
                .pipe(vfs.dest(output))
                .on('finish', () => {
                    rimraf.sync(tmpDir);
                    resolve();
                });
        }));
}

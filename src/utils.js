'use strict';

import path from 'path';
import fs from 'fs';

export function recFindByExt(base,ext,files,result) {
    files = files || fs.readdirSync(base);
    result = result || [];
    files.forEach(function (file) {
        let newbase = path.join(base,file);
        if( fs.statSync(newbase).isDirectory()) {
            result = this.recFindByExt(newbase,ext,fs.readdirSync(newbase),result)
        }
        else {
            if(file.substr(-1*(ext.length+1)) == '.' + ext ) {
                result.push(newbase)
            };
        };
    });
    return result
};

export function normalizePath(path) {
    const isWindows = process.platform.includes('win');
    if(isWindows) {
        return path.replace(/\//g, '\\');
    };
    return path;
};

export function botRootPath() {
    const basePath = process.cwd();
    const splitedBasePath = basePath.split('/');
    splitedBasePath.splice(splitedBasePath.length - 1, 1)
    return splitedBasePath.join('/'); 
};

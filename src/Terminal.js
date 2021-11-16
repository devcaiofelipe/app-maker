import { execSync } from 'child_process';
import { botRootPath, normalizePath } from './utils.js';


export default class Terminal {
    static gradlewClean() {
        execSync(`./gradlew clean`, { cwd: normalizePath(`${botRootPath()}/entregador/android`)}, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return
            };
            if (stdout) {
                console.log(`stdout: ${stdout}`);
            };
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            };
        });
    };

    static generateApp(appType) {
        const typeMap = {
            'apk': './gradlew assembleRelease',
            'bundle': './gradlew bundleRelease'
        };
        const commandToRun = typeMap[appType];
        execSync(commandToRun, { cwd: normalizePath(`${botRootPath()}/entregador/android`)}, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return
            };
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            };
            if (stdout) {
                console.log(`stdout: ${stdout}`);
            };
        });
    };

    static undoAll() {
        execSync(`git checkout -- . && git clean -fd`, { cwd: normalizePath(`${botRootPath()}/entregador`)}, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return
            };
            if (stdout) {
                console.log(`stdout: ${stdout}`);
            };
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            };
        });
    };
};
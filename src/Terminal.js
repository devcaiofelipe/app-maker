import { execSync } from 'child_process';


export default class Terminal {
    static gradlewClean() {
        execSync(`./gradlew clean`, { cwd: '/home/caio/maisentregas/entregador/android'}, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
        });
    };

    static generateApp(appType) {
        const typeMap = {
            'apk': './gradlew assembleRelease',
            'bundle': './gradlew bundleRelease'
        };
        const commandToRun = typeMap[appType];
        execSync(commandToRun, { cwd: '/home/caio/maisentregas/entregador/android'}, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
        });
    };

    static undoAll() {
        execSync(`git checkout -- . && git clean -fd`, { cwd: '/home/caio/maisentregas/entregador'}, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
        });
    };
}
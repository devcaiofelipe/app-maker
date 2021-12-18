import App from './src/App.js';
import Terminal from './src/Terminal.js';
import { appList } from './app-list.js';
import { botRootPath, normalizePath } from './src/utils.js'
import fs from 'fs';


for(const domain of appList) {
    const basePath = botRootPath();
    const configPath = normalizePath(basePath + `/bot/apps/${domain}/config.json`);
    const { appName, color, appType, packageName } = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));

    try {
        console.log(`Aplicativo ${appName} iniciado com sucesso, esse processo dura em média 5 minutos. Aguarde!`);
        const application = new App(appName, domain, color, appType, packageName);
        Terminal.undoAll();
        application.makeApp();
        Terminal.gradlewClean();
        Terminal.generateApp(application.getAppType);
        application.getOutput()
        Terminal.undoAll();
        console.log(`Aplicativo ${appName} finalizado com sucesso`);
    }catch(err) {
        console.log('[ERROR]', err);
        Terminal.undoAll();
    };
};

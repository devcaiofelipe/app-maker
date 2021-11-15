import App from './src/App.js';
import Terminal from './src/Terminal.js';
import { appList } from './app-list.js';


for(const app of appList) {
    if(!app.readyToGenerate) {
        continue;
    };
    try {
        console.log('<================================================>');
        console.log(`Aplicativo ${app.appName} iniciado com sucesso, esse processo dura em média 5 minutos. Aguarde!`);
        const application = new App(app.appName, app.domain, app.color, app.appType, app.packageName);
        Terminal.undoAll();
        application.makeApp();
        Terminal.gradlewClean();
        Terminal.generateApp(application.getAppType);
        application.getOutput()
        Terminal.undoAll();
        console.log(`Aplicativo ${app.appName} finalizado com sucesso`);
        console.log('<================================================>');
    }catch(err) {
        console.log('[ERROR]', err);
        Terminal.undoAll();
        
    }
};


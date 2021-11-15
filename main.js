import App from './src/App.js';
import Terminal from './src/Terminal.js';
import { appList } from './app-list.js';


for(const app of appList) {
    if(!app.readyToGenerate) {
        continue;
    };
    try {
        const application = new App(app.appName, app.domain, app.color, app.appType);
        Terminal.undoAll();
        application.makeApp();
        Terminal.gradlewClean();
        Terminal.generateApp(application.getAppType);
        application.getOutput()
        Terminal.undoAll();
    }catch(err) {
        console.log(err);
        Terminal.undoAll();
        console.log('Finalizado');
    }
};


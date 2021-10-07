import App from './src/App.js';
import Terminal from './src/Terminal.js';


const app = new App('Speed Motoboy JF', 'speedmotoboy', '#ccccff', 'apk')
try {
    app.renamePaths();
    app.setAppType();
    app.setLogo();
    app.setPackagesName();
    app.setAppName();
    app.setBanner();
    app.setGoogleServicesJson();
    app.setColor();
    Terminal.gradlewClean();
    Terminal.generateApp(app.getAppType);
    app.getOutput();
}catch(e) {
    console.log(e);
}
finally {
    Terminal.undoAll();
    console.log('Aplicativo finalizado');
};
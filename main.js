import App from './src/App.js';
import Terminal from './src/Terminal.js';


const app = new App('Speed Motoboy JF', 'speedmotoboy', '#ccccff')
app.renamePaths();
app.setLogo();
app.setPackagesName();
app.setAppName();
app.setBanner();
app.setGoogleServicesJson();
app.setColor();

Terminal.gradlewClean();
Terminal.assembleRelease();

app.getApk();

Terminal.undoAll();
import App from './src/App.js';
import Terminal from './src/Terminal.js';
import express from 'express';
const server = express();  


server.get('/test', function (req, res, next) {
    const app = new App('Postar Log', 'postarlog', '#dd2c72', 'apk')
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
        app.getOutput()
        setTimeout(function(){ console.log("Hello"); }, 10000);
        const filePath = "/home/caio/nodejs/bot/entregador-1.0.72-postarlog.apk"; //caminho do arquivo completo
        const fileName = "entregador-1.0.72-postarlog.apk"; // O nome padrão que o browser vai usar pra fazer download
        //res.status(200).json({ ok: true });
        return res.download(filePath, fileName)
    }catch(e) {
        console.log(e);
    }
    finally {
        Terminal.undoAll();
        console.log('Aplicativo finalizado')
    };
    
    //return res.send('Hello world')  
});

server.listen(3000, () => {
    console.log('App running at port 3000')
});

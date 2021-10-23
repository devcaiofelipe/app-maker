import App from './src/App.js';
import Terminal from './src/Terminal.js';
import express from 'express';
import multer from 'multer';
const server = express();

/*
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/home/caio/nodejs/bot')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })


server.post('/test', upload.any(), function(req, res) {
    
    console.log('YYYYYYYYYYYYYYYYYYYY')
    console.log
    console.log(typeof req.body.appName);
    console.log(typeof req.body.domain);
    console.log(typeof req.body.color);
    console.log(typeof req.body.appType);
    console.log(req.files);
    console.log('YYYYYYYYYYYYYYYYYYYY')
    return res.send({ ok: true });
})

server.post('/generateapp', function (req, res, next) {
    const app = new App('Papas', 'papas', '#8b51fe', 'apk')
    try {
        Terminal.undoAll();
        setTimeout(function(){ console.log('Esperando desfazer as alterações'); }, 10000);
        app.renamePaths();
        app.setSignatureKey();
        app.setLogo();
        app.setPackagesName();
        app.setAppName();
        app.setBanner();
        app.setGoogleServicesJson();
        app.setColor();
        Terminal.gradlewClean();
        Terminal.generateApp(app.getAppType);
        app.getOutput()
        setTimeout(function(){ console.log('Esperando desfazer as alterações'); }, 10000);
        const filePath = app.outPutPath; //caminho do arquivo completo
        const fileName = app.outPutName; 
        console.log('APP NAME:', fileName)// O nome padrão que o browser vai usar pra fazer download
        console.log('APP PATH:', filePath)// O nome padrão que o browser vai usar pra fazer download
        res.download(filePath, fileName)
    }catch(e) {
        console.log(e);
    }
    finally {
        Terminal.undoAll();
        console.log('Aplicativo finalizado')
    };
});

server.listen(3000, () => {
    console.log('App running at port 3000')
});*/


const app = new App('Papas', 'papas', '#8b51fe', 'apk')
    try {
        Terminal.undoAll();
        setTimeout(function(){ console.log('Esperando desfazer as alterações'); }, 10000);
        app.renamePaths();
        app.setSignatureKey();
        app.setLogo();
        app.setPackagesName();
        app.setAppName();
        app.setBanner();
        app.setGoogleServicesJson();
        app.setColor();
        Terminal.gradlewClean();
        Terminal.generateApp(app.getAppType);
        app.getOutput()
        setTimeout(function(){ console.log('Esperando desfazer as alterações'); }, 10000);
        const filePath = app.outPutPath; //caminho do arquivo completo
        const fileName = app.outPutName; 
        console.log('APP NAME:', fileName)// O nome padrão que o browser vai usar pra fazer download
        console.log('APP PATH:', filePath)// O nome padrão que o browser vai usar pra fazer download
        //res.download(filePath, fileName)
    }catch(e) {
        console.log(e);
    }
    finally {
        Terminal.undoAll();
        console.log('Aplicativo finalizado')
    };
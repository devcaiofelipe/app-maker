import App from './src/App.js';
import Terminal from './src/Terminal.js';
import express from 'express';
import multer from 'multer';
import mime from 'mime';
import fs from 'fs';
import bodyparser from 'body-parser';
import { removeFiles } from './src/utils.js';
const server = express();

server.use(bodyparser.json());
server.use(bodyparser.urlencoded({ extended: true }));
server.set('view engine', 'ejs');
server.get('/', function (req, res) {
    res.render('index.ejs');
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/home/caio/nodejs/bot')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

server.post('/', upload.any(), function (req, res) {
    console.log('TESTANDOOOOOOOOOOOOOOOOOOOOOOO')
    const { appName, domain, color, appType } = req.body;
    const app = new App(appName, domain, color, appType);
    //const app = new App('Papas - Entregador', 'papas', '#8b51fe', 'apk');
    try {
        console.log('DENTRO DO TRY');

        const basePath = process.cwd();

        Terminal.undoAll();
        console.log('AQUI 1');
        app.renamePaths();
        console.log('AQUI 2')
        app.setSignatureKey();
        console.log('AQUI 3')
        app.setLogo();
        console.log('AQUI 4')
        app.setPackagesName();
        console.log('AQUI 5')
        app.setAppName();
        console.log('AQUI 6')
        app.setBanner();
        console.log('AQUI 7')
        app.setGoogleServicesJson();
        console.log('AQUI 8')
        app.setColor();
        console.log('AQUI 9')
        Terminal.gradlewClean();
        console.log('AQUI 10')
        Terminal.generateApp(app.getAppType);
        console.log('AQUI 11')
        app.getOutput()
        console.log('AQUI 12')
        const fileName = app.outPutName;
        const filePath = app.outPutPath;
        const filesToRemove = [
            basePath + `/banner.png`,
            basePath + `/google-services.json`,
            basePath + `/logo_papas.png`,
        ];
        console.log('APP NAME:', fileName)
        console.log('APP PATH:', filePath)
        return res.download(fileName);
        setTimeout(function() {
            const file = filePath;

        const mimeType = mime.lookup(file);

        res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
        res.setHeader('Content-type', mimeType);

        const filestream = fs.createReadStream(file);
        filestream.pipe(res);
        }, 15000)
    }catch(err) {
        return res.status(400).json({ error: err })
    }
});

server.listen(3000, () => {
    console.log('App running at port 3000')
});
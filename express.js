import express from 'express';
import path from 'path';
const __dirname = path.resolve();

const app = express();  
console.log(__dirname);

//app.use('/home/caio/nodejs/bot', express.static('/img'));

app.get('/test', function (req, res, next) {
    
    const filePath = "/home/caio/nodejs/bot/entregador-1.0.72-postarlog.apk"; //caminho do arquivo completo
    const fileName = "entregador-1.0.72-postarlog.apk"; // O nome padrão que o browser vai usar pra fazer download
    //res.status(200).json({ ok: true });
    res.download(filePath, fileName)

    
    //return res.send('Hello world')  
});

app.listen(3000, () => {
    console.log('App running at port 3000')
});

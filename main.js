import App from './src/App.js';

const app = new App('Comercial Express', 'comercialexpress', '#000000')
app.setLogo();
app.setPackagesName();
app.setAppName();
app.renamePath();
app.setBanner();
app.setGoogleServicesJson();
app.setColor();

/*
import fs from 'fs';

const file = fs.readFileSync(`./banner.png`);
fs.writeFile(`./src/images/banner.png`, file, function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
});
const buffer = fs.readFileSync('./banner.png', function (err, data) {
    if (err) throw err;
    return data
    console.log(data);
    fs.writeFile('./src/images/banner.png', data, function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
});*/
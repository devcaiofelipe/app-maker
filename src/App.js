import fs from 'fs';
import replace from 'replace';
import Filehound from 'filehound';

export default class App {
    constructor(appName, carrierName, buttonColor) {
        this.appName = appName;
        this.carrierName = carrierName;
        this.buttonColor = buttonColor;
        this.basePath = '/home/caio/maisentregas/entregador'
        this.oldPath = this.basePath + '/src/assets/images/nometransportadora';
        this.newPath = this.basePath + `/src/assets/images/${carrierName}`
        
        console.log(`logo_${this.carrierName}.png`);
    };
    
    setLogo() {
        const paths = [
            this.basePath + `/android/app/src/main/res/drawable/logo_${this.carrierName}.png`,
            this.basePath + `/android/app/src/main/res/mipmap-hdpi/logo_${this.carrierName}.png`,
            this.basePath + `/android/app/src/main/res/mipmap-mdpi/logo_${this.carrierName}.png`,
            this.basePath + `/android/app/src/main/res/mipmap-xhdpi/logo_${this.carrierName}.png`,
            this.basePath + `/android/app/src/main/res/mipmap-xxhdpi/logo_${this.carrierName}.png`,
            this.basePath + `/android/app/src/main/res/mipmap-xxxhdpi/logo_${this.carrierName}.png`

        ];
        for(const path of paths) {
            const fileBuffer = fs.readFileSync(`/home/caio/nodejs/bot/logo_${this.carrierName}.png`);
            fs.writeFileSync(path, fileBuffer, function (err) {
                if (err) throw err;
                console.log('It\'s saved!');
            });
        };
    };

    setPackagesName() {
        replace({
            regex: 'nometransportadora',
            replacement: this.carrierName,
            paths: [
                this.basePath + `/android/app/src/main/java/com/maisentregas/entregador/v2/${this.carrierName}/MainActivity.java`,
                this.basePath + `/android/app/src/main/java/com/maisentregas/entregador/v2/${this.carrierName}/MainApplication.java`,
                this.basePath + '/android/app/src/main/AndroidManifest.xml',
                this.basePath + '/android/gradle.properties',
                this.basePath + '/src/core/utils.js',
        
            ],
            recursive: false,
            silent: false,
        });
    };

    setAppName() {
        replace({
            regex: "nomeaplicativo",
            replacement: this.appName,
            paths: [
                this.basePath + '/android/app/src/main/res/values/strings.xml',
                this.basePath + '/src/core/utils.js'
                
            ],
            recursive: false,
            silent: false,
        });
    };

    renamePaths() {
        fs.renameSync(this.oldPath, this.newPath, function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log("Successfully renamed the directory.")
            };
        });

        fs.renameSync(this.basePath + '/android/app/src/main/java/com/maisentregas/entregador/v2/nometransportadora', this.basePath + `/android/app/src/main/java/com/maisentregas/entregador/v2/${this.carrierName}`, function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log("Successfully renamed the directory.")
            };
        });
    };

    setBanner() {
        const bannerBuffer = fs.readFileSync('/home/caio/nodejs/bot/banner.png');
        fs.writeFileSync(this.basePath + `/src/assets/images/${this.carrierName}/banner.png`, bannerBuffer, function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
        });

        /*fs.renameSync(this.newPath, this.oldPath, function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log("Successfully renamed the directory.")
            };
        });*/
    };

    setGoogleServicesJson() {
        const gsBuffer = fs.readFileSync('/home/caio/nodejs/bot/google-services.json');
        fs.writeFileSync(this.basePath + `/android/app/google-services.json`, gsBuffer, function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
        });
    };

    setColor() {
        replace({
            regex: "coraplicativo",
            replacement: this.buttonColor,
            paths: [
                this.basePath + '/src/core/utils.js',  
            ],
            recursive: false,
            silent: false,
        });
    };

    getApk() {
        Filehound.create()
        .ext('apk')
        .paths("/home/caio/maisentregas/entregador/android/app/build/outputs/apk/release")
        .find((err, arrayPath) => {
            if (err) return console.error("handle err", err);
            const apkPath = arrayPath[0];
            const apkBuffer = fs.readFileSync(apkPath);
            const fullPath = apkPath.split('/');
            const apkName = fullPath[fullPath.length - 1];
            fs.writeFileSync(`/home/caio/nodejs/bot/${apkName}`, apkBuffer, function (err) {
                if (err) throw err;
                console.log('It\'s saved!');
            });
            console.log(arrayPath);
        });
    };
};
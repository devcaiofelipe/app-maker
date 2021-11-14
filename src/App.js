import fs from 'fs';
import replace from 'replace';
import { recFindByExt } from './utils.js';

export default class App {
    constructor(appName, domain, buttonColor, appType) {
        this.appName = appName;
        this.domain = domain;
        this.buttonColor = buttonColor;
        this.appType = appType;
        this.basePath = process.cwd();
        this.oldPath = this.basePath + '/entregador/src/assets/images/nometransportadora';
        this.newPath = this.basePath + `/entregador/src/assets/images/${domain}`;
        this.generatedFileName = null;
        this.generatedFilePath = null;
    };

    setSignatureKey() {
        const typeMap = {
            'apk': '#apkkey ',
            'bundle': '#bundlekey '
        }
        replace({
            regex: typeMap[this.appType],
            replacement: '',
            paths: [
                this.basePath + '/entregador/android/gradle.properties'    
            ],
            recursive: true,
            silent: true,
        }); 
    };
    
    setLogo() {
        const paths = [
            this.basePath + `/entregador/android/app/src/main/res/drawable/logo_${this.domain}.png`,
            this.basePath + `/entregador/android/app/src/main/res/mipmap-hdpi/logo_${this.domain}.png`,
            this.basePath + `/entregador/android/app/src/main/res/mipmap-mdpi/logo_${this.domain}.png`,
            this.basePath + `/entregador/android/app/src/main/res/mipmap-xhdpi/logo_${this.domain}.png`,
            this.basePath + `/entregador/android/app/src/main/res/mipmap-xxhdpi/logo_${this.domain}.png`,
            this.basePath + `/entregador/android/app/src/main/res/mipmap-xxxhdpi/logo_${this.domain}.png`

        ];
        for(const path of paths) {
            const fileBuffer = fs.readFileSync(`${this.basePath}/apps/${this.domain}/logo_${this.domain}.png`);
            fs.writeFileSync(path, fileBuffer, function (err) {
                if (err) throw err;
                console.log('It\'s saved!');
            });
        };
    };

    setPackagesName() {
        replace({
            regex: 'nometransportadora',
            replacement: this.domain,
            paths: [
                this.basePath + `/entregador/android/app/src/main/java/com/maisentregas/entregador/v2/${this.domain}/MainActivity.java`,
                this.basePath + `/entregador/android/app/src/main/java/com/maisentregas/entregador/v2/${this.domain}/MainApplication.java`,
                this.basePath + '/entregador/android/app/src/main/AndroidManifest.xml',
                this.basePath + '/entregador/android/gradle.properties',
                this.basePath + '/entregador/src/core/utils.js',
        
            ],
            recursive: false,
            silent: false,
        });
    };

    setAppName() {
        const firstName = this.appName.replace(/"/g, '\\"');
        const secondName = firstName.replace(/&/g, '&amp;');
        const normalizedName = secondName.replace(/\|/g, '\\|');

        replace({
            regex: "nomeaplicativo",
            replacement: normalizedName,
            paths: [
                this.basePath + '/entregador/android/app/src/main/res/values/strings.xml',
                this.basePath + '/entregador/src/core/utils.js'
                
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

        fs.renameSync(this.basePath + '/entregador/android/app/src/main/java/com/maisentregas/entregador/v2/nometransportadora', this.basePath + `/entregador/android/app/src/main/java/com/maisentregas/entregador/v2/${this.domain}`, function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log("Successfully renamed the directory.")
            };
        });
    };

    setBanner() {
        const bannerBuffer = fs.readFileSync(`${this.basePath}/apps/${this.domain}/banner.png`);
        fs.writeFileSync(this.basePath + `/entregador/src/assets/images/${this.domain}/banner.png`, bannerBuffer, function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
        });
    };

    setGoogleServicesJson() {
        const gsBuffer = fs.readFileSync(`${this.basePath}/apps/${this.domain}/google-services.json`);
        
        fs.writeFileSync(this.basePath + `/entregador/android/app/google-services.json`, gsBuffer, function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
        });
    };

    setColor() {
        replace({
            regex: "coraplicativo",
            replacement: this.buttonColor,
            paths: [
                this.basePath + '/entregador/src/core/utils.js',  
            ],
            recursive: false,
            silent: false,
        });
    };

    getOutput() {
        const extensionMap = {
            'apk': 'apk',
            'bundle': 'aab',
        };
        const fileList = recFindByExt(`${this.basePath}/entregador/android/app/build/outputs/${this.appType}/release`, extensionMap[this.appType]);
        const filePath = fileList[0];
        const fileBuffer = fs.readFileSync(filePath);
        const fullPath = filePath.split('/');
        const fileName = fullPath[fullPath.length - 1];
        const outPutPath = `${this.basePath}/${fileName}`;
        fs.writeFileSync(outPutPath, fileBuffer, function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
        });
        this.generatedFilePath = filePath;
        this.generatedFileName = fileName;
        console.log('Finalizei o aplicativo agora');
    };

    get getAppType() {
        return this.appType;
    };

    get outPutPath() {
        return this.generatedFilePath;
    };

    get outPutName() {
        return this.generatedFileName;
    }
};
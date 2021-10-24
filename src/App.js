import fs from 'fs';
import replace from 'replace';
import { recFindByExt } from './utils.js';

export default class App {
    constructor(appName, carrierName, buttonColor, appType) {
        this.appName = appName;
        this.carrierName = carrierName;
        this.buttonColor = buttonColor;
        this.appType = appType;
        this.basePath = process.cwd();
        this.oldPath = this.basePath + '/entregador/src/assets/images/nometransportadora';
        this.newPath = this.basePath + `/entregador/src/assets/images/${carrierName}`;
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
            this.basePath + `/entregador/android/app/src/main/res/drawable/logo_${this.carrierName}.png`,
            this.basePath + `/entregador/android/app/src/main/res/mipmap-hdpi/logo_${this.carrierName}.png`,
            this.basePath + `/entregador/android/app/src/main/res/mipmap-mdpi/logo_${this.carrierName}.png`,
            this.basePath + `/entregador/android/app/src/main/res/mipmap-xhdpi/logo_${this.carrierName}.png`,
            this.basePath + `/entregador/android/app/src/main/res/mipmap-xxhdpi/logo_${this.carrierName}.png`,
            this.basePath + `/entregador/android/app/src/main/res/mipmap-xxxhdpi/logo_${this.carrierName}.png`

        ];
        for(const path of paths) {
            const fileBuffer = fs.readFileSync(`${this.basePath}/logo_${this.carrierName}.png`);
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
                this.basePath + `/entregador/android/app/src/main/java/com/maisentregas/entregador/v2/${this.carrierName}/MainActivity.java`,
                this.basePath + `/entregador/android/app/src/main/java/com/maisentregas/entregador/v2/${this.carrierName}/MainApplication.java`,
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
        console.log(this.basePath);
        fs.renameSync(this.oldPath, this.newPath, function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log("Successfully renamed the directory.")
            };
        });

        fs.renameSync(this.basePath + '/entregador/android/app/src/main/java/com/maisentregas/entregador/v2/nometransportadora', this.basePath + `/entregador/android/app/src/main/java/com/maisentregas/entregador/v2/${this.carrierName}`, function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log("Successfully renamed the directory.")
            };
        });
    };

    setBanner() {
        const bannerBuffer = fs.readFileSync(`${this.basePath}/banner.png`);
        fs.writeFileSync(this.basePath + `/entregador/src/assets/images/${this.carrierName}/banner.png`, bannerBuffer, function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
        });
    };

    setGoogleServicesJson() {
        const gsBuffer = fs.readFileSync(`${this.basePath}/google-services.json`);
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
        console.log('XXXXXXXXXXXXXXXXXXXX')
        console.log(fileList);
        console.log('XXXXXXXXXXXXXXXXXXXX')
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
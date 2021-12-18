import fs from 'fs';
import replace from 'replace';
import { recFindByExt, normalizePath, botRootPath } from './utils.js';

export default class App {
    constructor(appName, domain, buttonColor, appType, packageName) {
        this.appName = appName;
        this.domain = domain;
        this.buttonColor = buttonColor;
        this.appType = appType;
        this.packageName = packageName;
        this.basePath = botRootPath();
    };

    setSignatureKey() {
        const typeMap = {
            'apk': '#apkkey ',
            'bundle': '#bundlekey '
        };
        replace({
            regex: typeMap[this.appType],
            replacement: '',
            paths: [
                normalizePath(this.basePath + '/entregador/android/gradle.properties')
            ],
            recursive: true,
            silent: true,
        });
    };
    
    setLogo() {
        replace({
            regex: 'nometransportadora',
            replacement: this.domain,
            paths: [
                normalizePath(this.basePath + '/entregador/android/app/src/main/AndroidManifest.xml'),
            ],
            recursive: false,
            silent: false,
        });
        const paths = [
            normalizePath(this.basePath + `/entregador/android/app/src/main/res/drawable/logo_${this.domain}.png`),
            normalizePath(this.basePath + `/entregador/android/app/src/main/res/mipmap-hdpi/logo_${this.domain}.png`),
            normalizePath(this.basePath + `/entregador/android/app/src/main/res/mipmap-mdpi/logo_${this.domain}.png`),
            normalizePath(this.basePath + `/entregador/android/app/src/main/res/mipmap-xhdpi/logo_${this.domain}.png`),
            normalizePath(this.basePath + `/entregador/android/app/src/main/res/mipmap-xxhdpi/logo_${this.domain}.png`),
            normalizePath(this.basePath + `/entregador/android/app/src/main/res/mipmap-xxxhdpi/logo_${this.domain}.png`)
        ];
        for(const path of paths) {
            const fileBuffer = fs.readFileSync(`${this.basePath}/bot/apps/${this.domain}/logo_${this.domain}.png`);
            fs.writeFileSync(path, fileBuffer, function (err) {
                if (err) throw err;
                console.log('It\'s saved!');
            });
        };
    };

    setPackageName() {
        replace({
            regex: 'nomedopacote',
            replacement: this.packageName,
            paths: [
                normalizePath(this.basePath + `/entregador/android/app/src/main/java/com/maisentregas/entregador/v2/${this.domain}/MainActivity.java`),
                normalizePath(this.basePath + `/entregador/android/app/src/main/java/com/maisentregas/entregador/v2/${this.domain}/MainApplication.java`),
                normalizePath(this.basePath + '/entregador/android/app/src/main/AndroidManifest.xml'),
                normalizePath(this.basePath + '/entregador/android/gradle.properties'),
                normalizePath(this.basePath + '/entregador/src/core/utils.js'),
            ],
            recursive: false,
            silent: false,
        });
    };

    setAppName() {
        const firstName = this.appName.replace(/"/g, '\\"');
        const secondName = firstName.replace(/&/g, '&amp;');
        const thirdName = secondName.replace(/'/g, "\\'");
        const normalizedName = thirdName.replace(/\|/g, '\\|');
        replace({
            regex: "nomeaplicativo",
            replacement: normalizedName,
            paths: [
                normalizePath(this.basePath + '/entregador/android/app/src/main/res/values/strings.xml'), 
            ],
            recursive: false,
            silent: false,
        });
    };

    setAppNameInLoginScreen() {
        replace({
            regex: "nomeaplicativo",
            replacement: this.appName,
            paths: [
                normalizePath(this.basePath + '/entregador/src/core/utils.js')
            ],
            recursive: false,
            silent: false,
        });
    };

    renamePath() {
        const oldPath = normalizePath(this.basePath + '/entregador/android/app/src/main/java/com/maisentregas/entregador/v2/nometransportadora');
        const newPath = normalizePath(this.basePath + `/entregador/android/app/src/main/java/com/maisentregas/entregador/v2/${this.domain}`);
        fs.renameSync(oldPath, newPath, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully renamed the directory.");
            };
        });
    };

    setBanner() {
        const oldPath = normalizePath(this.basePath + '/entregador/src/assets/images/nometransportadora');
        const newPath = normalizePath(this.basePath + `/entregador/src/assets/images/${this.domain}`);
        fs.renameSync(oldPath, newPath, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully renamed the directory.");
            };
        });
        replace({
            regex: 'nometransportadora',
            replacement: this.domain,
            paths: [
                normalizePath(this.basePath + '/entregador/src/core/utils.js')
            ],
            recursive: false,
            silent: false,
        });
        const bannerPath = normalizePath(`${this.basePath}/bot/apps/${this.domain}/banner.png`);
        const newBannerPath = normalizePath(this.basePath + `/entregador/src/assets/images/${this.domain}/banner.png`);
        const bannerBuffer = fs.readFileSync(bannerPath);
        fs.writeFileSync(newBannerPath, bannerBuffer, function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
        });
    };

    setGoogleServicesJson() {
        const gsPath = normalizePath(`${this.basePath}/bot/apps/${this.domain}/google-services.json`);
        const newgsPath = normalizePath(this.basePath + `/entregador/android/app/google-services.json`);
        const gsBuffer = fs.readFileSync(gsPath);
        fs.writeFileSync(newgsPath, gsBuffer, function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
        });
    };

    setColor() {
        replace({
            regex: "coraplicativo",
            replacement: this.buttonColor,
            paths: [
                normalizePath(this.basePath + '/entregador/src/core/utils.js'),  
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

        const isWindows = process.platform.includes('win');
        const pathToFind = normalizePath(`${this.basePath}/entregador/android/app/build/outputs/${this.appType}/release`);
        const fileList = recFindByExt(pathToFind, extensionMap[this.appType]);
        const filePath = fileList[0];
        const fileBuffer = fs.readFileSync(filePath);
        const fullPath = isWindows ? filePath.split('\\') : filePath.split('/');
        const fileName = fullPath[fullPath.length - 1];
        const outPutPath = normalizePath(`${this.basePath}/bot/apps/${this.domain}/${fileName}`);
        fs.writeFileSync(outPutPath, fileBuffer, function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
        });
    };

    get getAppType() {
        return this.appType;
    };

    makeApp() {
        this.renamePath();
        this.setSignatureKey();
        this.setLogo();
        this.setPackageName();
        this.setAppName();
        this.setAppNameInLoginScreen();
        this.setBanner();
        this.setGoogleServicesJson();
        this.setColor();
    };
};

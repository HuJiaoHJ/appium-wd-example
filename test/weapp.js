require("../helpers/setup");

const wd = require("wd");

const serverConfig = {
    host: 'localhost',
    port: 4723
};

describe("weapp test", function () {
    this.timeout(300000);
    
    let driver;
    let allPassed = true;

    before(function () {
        
        driver = wd.promiseChainRemote(serverConfig);
        require("../helpers/logging").configure(driver);

        let desired = {
            platformName: 'Android',
            deviceName: 'U2TDU15904014013',
            appPackage: 'com.tencent.mm',
            appActivity: '.ui.LauncherUI',
            fullReset: false,
            fastReset: false,
            noReset: true,
            chromeOptions: {
                androidProcess: 'com.tencent.mm:tools',
            }
        };
        return driver
            .init(desired)
            .setImplicitWaitTimeout(8000);
    });

    afterEach(function () {
        allPassed = allPassed && this.currentTest.state === 'passed';
    });

    it("enter 小程序", function () {
        return driver
            .elementByXPath("//*[@text='发现']")
            .click()
            .elementByXPath("//*[contains(@text, '朋友圈')]")
            .then(function () {
                let action = new wd.TouchAction(driver);
                action.press({x: 20, y: 0}).moveTo({x: 20, y: 20}).wait(200).release().perform();
                return driver.performTouchAction(action);
            })
            .elementByXPath("//*[@text='小程序']")
            .click();
    });
    it("enter 美团外卖", function () {
        return driver
            .elementByXPath("//*[contains(@text, '美团外卖')]")
            .click()
            .elementByXPath("//*[contains(@text, '美团外卖')]")
            .should.eventually.exist;
    });
    it("test", function () {
        return driver
            .contexts()
            .then(function (ctxs) {
                // console.log(ctxs);
                return driver.context(ctxs[ctxs.length - 1]);
            })
            // .context("WEBVIEW_com.tencent.mm:tools")
            .sleep(5000)
            .source()
            .then(function (source) {
                console.log(source);
            })
            // .elementsByCss('*', function (err, els) {
            //     if (err) {
            //         console.log(err);
            //     }
            //     console.log(els);
            // })
            // .elementById('name_input')
            // .context("WEBVIEW_com.tencent.mm:tools")
            // .sleep(5000)
            // .elementByXPath("//*[contains(@text, '美食')]")
            // .click()
            // .elementByXPath("//*[contains(., '金百万')]")
            // .click();
    });
});
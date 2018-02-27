require("../helpers/setup");

const wd = require("wd");

const serverConfig = {
    host: 'localhost',
    port: 4723
};

describe("sample test", function () {
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
                androidProcess: 'com.tencent.mm:appbrand0',
            }
        };
        return driver
            .init(desired)
            .setImplicitWaitTimeout(8000);
    });

    after(function () {
        return driver
            .quit();
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
            .click()
            .elementByXPath("//*[contains(@text, '美团酒店+')]")
            .click()
            .elementByXPath("//*[contains(@text, '美团酒店')]")
            .should.eventually.exist
            .context('WEBVIEW_com.tencent.mm:appbrand0')
            .sleep(5000)
            .elementsByCssSelector('.cell', function (err, els) {
                els[0].click();
            })
            .sleep(5000);
    });
});
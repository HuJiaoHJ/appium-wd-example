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

    it("进入微信首页", function () {
        return driver
            .elementByXPath("//*[@text='登录']")
            .should.eventually.exist
            .click();
    });
});
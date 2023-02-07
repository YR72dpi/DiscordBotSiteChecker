import puppeteer from 'puppeteer';
export default async function screenshot(url) {
    return new Promise(async (resolve, reject) => {
        var dateTime = new Date();
        dateTime =
            String(dateTime.getDate()) + "_" +
            + String(dateTime.getMonth() + 1) + "_" +
            + String(dateTime.getFullYear()) + "-" +
            + String(dateTime.getHours()) + "_" +
            + String(dateTime.getMinutes())

        var screenshotPath = "screenshot/";
        var screenshotName = "screenshot_" + dateTime + ".jpg";

        const browser = await puppeteer.launch();

        const page = await browser.newPage();

        page.on('console', msg => console.log('PAGE LOG:', msg.text));

        await page.setViewport({ width: 1920, height: 1000 });

        await page.goto(url, {
            waitUntil: 'networkidle0'
        }).then(() => {
            console.log("Puppeteer => Connexion réussie : " + url)
        });

        setTimeout(async () => {
            await page.screenshot({
                path: screenshotPath + screenshotName
            }).then(async (e) => {
                await browser.close();
                resolve(screenshotPath + screenshotName)
            });
        }, 2500)
    })
}
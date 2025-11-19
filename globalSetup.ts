import { chromium, firefox, webkit } from 'playwright';

export default async () => {
    async function checkBrowserVersion(browserType, browserName) {
        const browser = await browserType.launch();
        const browserVersion = await browser.version();
        console.log(`Browser version for ${browserName}: ${browserVersion}`);
        await browser.close();
    }

    await checkBrowserVersion(chromium, 'Chromium');
    await checkBrowserVersion(firefox, 'Firefox');
    await checkBrowserVersion(webkit, 'Webkit');
};

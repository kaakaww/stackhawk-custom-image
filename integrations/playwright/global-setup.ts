// global-setup.ts
import { chromium, FullConfig } from '@playwright/test';
import { accountStoragePath, allTestAccounts, TestAccount } from './accounts';
import { PlaywrightPage } from './playwrightPage';

const loginAs = async (page: PlaywrightPage, account: TestAccount): Promise<void> => {
    const { name } = account;
    // eslint-disable-next-line no-console
    console.log(`...attempting email login as ${name}`);
    await page.attemptLogin("")
    // eslint-disable-next-line no-console
    console.log(`Authentication completed for ${name}!`);
};

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
async function globalSetup(_config: FullConfig<TestAccount>): Promise<void> {
    // eslint-disable-next-line no-console
    console.log(`Begin global setup! Expecting ${allTestAccounts.length} accounts`);
    const browser = await chromium.launch();
    const setupAccounts = await Promise.all(
        allTestAccounts.map(async (account: TestAccount) => {
            const path = accountStoragePath(account);
            const context = await browser.newContext();
            await context.exposeFunction('Playwright', ({}) => true);
            const page = await context.newPage();
            const raptorPage = new PlaywrightPage(page, account);
            await loginAs(raptorPage, account);
            await page.context().storageState({ path });
            await page.close();
            return account.name;
        })
    );
    await browser.close();
    // eslint-disable-next-line no-console
    console.log('Global Setup completed for these accounts', setupAccounts);
}

export default globalSetup;
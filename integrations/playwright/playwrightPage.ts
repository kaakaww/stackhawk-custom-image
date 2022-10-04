/**
 * PlaywrightPage is a custom playwright utility class with helper functions for complex tests.
 * These helper functions use the given page and TestAccount to make simpler tests
 * @export
 * @class PlaywrightPage
 */
import {Page} from "@playwright/test";
import {TestAccount} from "./accounts";
import { config } from 'dotenv';

export const parsedConfig = config().parsed as Record<string, string>;
export const appHost = (): string => parsedConfig['APP_TEST_HOST'];
export const loginPW = (): string => parsedConfig['LOGIN_PW'];

export class PlaywrightPage {
    public readonly page: Page;
    public readonly account: TestAccount;

    public constructor(page: Page, details: TestAccount) {
        this.page = page;
        this.account = details
    }

    public async attemptLogin(expectedAppPage: String): Promise<void> {
        await this.page.goto(appHost(), { waitUntil: 'networkidle' });
        // Click text=Email
        await this.page.click('text=Email');
        // Fill [placeholder="Email"]
        await this.page.fill('[placeholder="Email"]', this.account.email);
        // Press Tab
        await this.page.click('[placeholder="Password"]');
        // Fill [placeholder="Password"]
        await this.page.fill('[placeholder="Password"]', loginPW());
        // Click button:has-text("Login")
        await this.page.keyboard.press('Enter');
        // wait to arrive at expected login
        await this.page.waitForNavigation({ url: `${appHost()}${expectedAppPage}` });
    }
}
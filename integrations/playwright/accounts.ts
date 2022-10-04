/**
 * Represents a user logging in with email and credentials
 */
import * as path from "path";
import {TestInfo} from "@playwright/test";

export type TestAccount = TestInfo & {
    // the name of this user
    name?: string;
    // the expected feature plan for this account
    plan?: string;
    // the expected user role for this account (eg. Admin)
    role?: string;
    // optional identifier to use a jwtToken
    jwtToken?: string;
    // the account username
    username?: string;
    // the account password
    password?: string;
}

export const allTestAccounts: TestAccount[] = [];

const authStoragePath = 'auth';

export const accountStoragePath = (account: TestAccount): string =>
    path.join(__dirname, authStoragePath, `${account.name}_${account.plan}_${account.role}.json`);
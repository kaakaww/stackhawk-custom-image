import { PlaywrightTestConfig, ViewportSize } from "@playwright/test";
import { accountStoragePath, allTestAccounts, TestAccount } from "./accounts";
import path from "path";
import dotenv from 'dotenv';

export const parsedConfig = dotenv.config().parsed as Record<string, string>;
export const appHost = (): string => parsedConfig["APP_TEST_HOST"];

interface TestProject {
  name: string;
  use: {
    browserName?: "chromium" | "firefox" | "webkit";
    viewport: ViewportSize;
    userAgent?: string;
    deviceScaleFactor?: number;
    isMobile?: boolean;
    hasTouch?: boolean;
    defaultBrowserType?: "chromium" | "firefox" | "webkit";
    storageState?: string;
  };
}

type PlaywrightProject = TestProject & { metadata: TestAccount };

const testProjects: TestProject[] = [
  {
    name: "Desktop Chromium",
    use: {
      browserName: "chromium",
      viewport: { width: 1280, height: 720 },
    },
  },
  {
    name: "Desktop Safari",
    use: {
      browserName: "webkit",
      viewport: { width: 1280, height: 720 },
    },
  },
  {
    name: "Desktop Firefox",
    use: {
      browserName: "firefox",
      viewport: { width: 1280, height: 720 },
    },
  },
  // {
  //   name: 'Mobile Chrome',
  //   use: devices['Pixel 5'],
  // },
  // {
  //   name: 'Mobile Safari',
  //   use: devices['iPhone 12'],
  // },
];

const playwrightProjects: PlaywrightProject[] = testProjects.flatMap(
  (testProject: TestProject) =>
    allTestAccounts.map((account) => {
      const name = `${testProject.name}:${account.name}`;
      const storageState = accountStoragePath(account);
      const use = { ...testProject.use, storageState };
      const metadata = { ...account as TestAccount };
      const project : PlaywrightProject = { ...testProject, metadata, use, name }
      return project
    })
);

const config: PlaywrightTestConfig<PlaywrightProject> = {
  forbidOnly: true,
  globalSetup: path.join(__dirname, "global-setup.ts"),
  testIgnore: "src/**",
  retries: 0,
  metadata: {
    details: "details here go in the test report",
  },
  use: {
    ignoreHTTPSErrors: true,
    video: "on-first-retry",
    baseURL: appHost(),
    javaScriptEnabled: true,
    screenshot: "only-on-failure",
  },
  projects: playwrightProjects,
  reporter: [
    ["list"],
    // ['json', { outputFile: 'results.json' }]
    // ['junit', { outputFile: 'results.xml' }]
  ],
};
export default config;

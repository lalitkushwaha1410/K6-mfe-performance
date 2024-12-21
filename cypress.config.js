/// <reference types = 'cypress' />
import { ReportGenerator } from "lighthouse/report/generator/report-generator";
import { defineConfig } from "cypress";
import { lighthouse, prepareAudit } from "@cypress-audit/lighthouse";
import * as fs from "fs";
let lighthouseReportName;

export default defineConfig({
  retries: {
    runMode: 0,
    openMode: 0,
  },
  defaultCommandTimeout: 80000,
  e2e: {
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });

      on("task", {
        setLighthouseReportName: (name) => {
          lighthouseReportName = name
          return lighthouseReportName
        },
        lighthouse: lighthouse((lighthouseReport) => {
          fs.writeFileSync(`cypress/Report/${lighthouseReportName}_PerformanceReport.html`, ReportGenerator.generateReport(lighthouseReport.lhr, 'html'));
        }),
      });
    },
  },
});

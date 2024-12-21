import { shared } from '../fixtures/constants/shared';
import { PodcastPage } from '../support/ui/pages/Podcast.po';
import "cypress-audit/commands";
var user = "";

describe('Performance Test for Podcast', { testIsolation: false }, () => {
  const podcastPage = new PodcastPage();
  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  before(() => {
    cy.clearAllSessionStorage();
    cy.clearAllCookies();
  });

  it('should run performance test for Authoring - normal', () => {

    const customThresholds = {
      performance: 10,
      accessibility: 10,
      'first-contentful-paint': 8000,
      'largest-contentful-paint': 15000,
      'cumulative-layout-shift': 0.1,
      'total-blocking-time': 8000,
      interactive: 10000,
      seo: 60,
    };

    const desktopConfig = {
      formFactor: "desktop",
      screenEmulation: {
        width: 1350,
        height: 940,
        deviceScaleRatio: 1,
        mobile: false,
        disable: false,
      },
      throttling: {
        rttMs: 40,
        throughputKbps: 11024,
        cpuSlowdownMultiplier: 1,
        requestLatencyMs: 0,
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0,
      },
    };
    cy.appUrl();
    cy.Login(shared.users.authoringUser.username, Cypress.env('password'));
    podcastPage.clickOnAddPodcast();
    podcastPage.enterPodcastURL(shared.PocastURL);
    podcastPage.clickOnPopupNextButton();
    podcastPage.selectNormalPodcast();
    podcastPage.clickOnPopupAddToPageButton();
    user = "Author-Normal";

    Cypress.env('user', user);
    cy.url().should('contain', 'version');

    cy.location('search').then((search) => {
      const idMatch = search.match(/id=([^&]*)/);
      const versionMatch = search.match(/version=([^&]*)/);

      const id = idMatch ? idMatch[1] : null;
      const version = versionMatch ? versionMatch[1] : null;
      Cypress.env('id', id);
      Cypress.env('version', version);
      cy.log(id);
      cy.log(version);
    });

    cy.task('setLighthouseReportName', user)
      .then(() => {
        cy.lighthouse(customThresholds, desktopConfig);
      })
  });

  it('should run performance test for Subscriber - normal', { taskTimeout: 90_000 }, () => {

    const customThresholds = {
      performance: 10,
      accessibility: 10,
      'first-contentful-paint': 8000,
      'largest-contentful-paint': 20000,
      'cumulative-layout-shift': 0.1,
      'total-blocking-time': 8000,
      interactive: 25000,
      seo: 60,
    };

    const desktopConfig = {
      formFactor: "desktop",
      screenEmulation: {
        width: 1350,
        height: 940,
        deviceScaleRatio: 1,
        mobile: false,
        disable: false,
      },
      throttling: {
        rttMs: 40,
        throughputKbps: 11024,
        cpuSlowdownMultiplier: 1,
        requestLatencyMs: 0,
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0,
      },
    };

    const id = Cypress.env('id');
    const version = Cypress.env('version');
    const env = Cypress.env('ENV');
    console.log("ENv is" + env);
    cy.visit(shared.environment.subscriber[env] + id + "&version=" + version);
    podcastPage.LoginIntoSubscriberView();
    cy.wait(6000);
    podcastPage.findPodcastInSubscriber();

    cy.url().should('contain', 'version');
    user = "Subscriber-Normal";

    cy.task('setLighthouseReportName', user)
      .then(() => {
        cy.lighthouse(customThresholds, desktopConfig);
      })

  });

  it('should run performance test for Authoring - minimal', () => {

    const customThresholds = {
      performance: 10,
      accessibility: 10,
      'first-contentful-paint': 8000,
      'largest-contentful-paint': 15000,
      'cumulative-layout-shift': 0.1,
      'total-blocking-time': 8000,
      interactive: 10000,
      seo: 60,
    };

    const desktopConfig = {
      formFactor: "desktop",
      screenEmulation: {
        width: 1350,
        height: 940,
        deviceScaleRatio: 1,
        mobile: false,
        disable: false,
      },
      throttling: {
        rttMs: 40,
        throughputKbps: 11024,
        cpuSlowdownMultiplier: 1,
        requestLatencyMs: 0,
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0,
      },
    };
    cy.appUrl();
    cy.wait(5000);
    cy.reload();
    cy.wait(4000);
    cy.waitForVisible('button[data-testid^="Add__Podcast"]', 15000);
    podcastPage.clickOnAddPodcast();
    podcastPage.enterPodcastURL(shared.PocastURL);
    podcastPage.clickOnPopupNextButton();
    podcastPage.selectMinimalPodcast();
    podcastPage.clickOnPopupAddToPageButton();
    user = "Author-Minimal";

    Cypress.env('user', user);
    cy.url().should('contain', 'version');

    cy.location('search').then((search) => {
      const idMatch = search.match(/id=([^&]*)/);
      const versionMatch = search.match(/version=([^&]*)/);

      const id = idMatch ? idMatch[1] : null;
      const version = versionMatch ? versionMatch[1] : null;
      Cypress.env('id-1', id);
      Cypress.env('version-1', version);
      cy.log(id);
      cy.log(version);
    });

    cy.task('setLighthouseReportName', user)
      .then(() => {
        cy.lighthouse(customThresholds, desktopConfig);
      })
  });

  it('should run performance test for Subscriber - minimal', { taskTimeout: 90_000 }, () => {

    const customThresholds = {
      performance: 10,
      accessibility: 10,
      'first-contentful-paint': 8000,
      'largest-contentful-paint': 20000,
      'cumulative-layout-shift': 0.1,
      'total-blocking-time': 8000,
      interactive: 25000,
      seo: 60,
    };

    const desktopConfig = {
      formFactor: "desktop",
      screenEmulation: {
        width: 1350,
        height: 940,
        deviceScaleRatio: 1,
        mobile: false,
        disable: false,
      },
      throttling: {
        rttMs: 40,
        throughputKbps: 11024,
        cpuSlowdownMultiplier: 1,
        requestLatencyMs: 0,
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0,
      },
    };

    const id = Cypress.env('id-1');
    const version = Cypress.env('version-1');
    const env = Cypress.env('ENV');
    cy.visit(shared.environment.subscriber[env] + id + "&version=" + version);
    cy.wait(6000);
    podcastPage.findPodcastInSubscriber();

    cy.url().should('contain', 'version');
    user = "Subscriber-Minimal";

    cy.task('setLighthouseReportName', user)
      .then(() => {
        cy.lighthouse(customThresholds, desktopConfig);
      })
  });
});

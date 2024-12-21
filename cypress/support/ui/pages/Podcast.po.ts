import { shared } from '../../../fixtures/constants/shared';

export class PodcastPage {
  clickAddPodcast = 'button[data-testid="Add__Podcast"]';
  subscriberUsername = 'input[id="username-input"]';
  subscriberPassword = 'input[id="password-input"]';
  subcriberLoginButton = 'button[id="login-button"]';
  enterPodcastTestUrl = 'textarea[data-testid="url__input__box"]';
  podcastSubscriber = 'div[data-testid="podcast-page-frame"]>iframe';
  podcastNormal = 'div[data-testid="player-type-normal"]';
  podcastMinimal = 'div[data-testid="player-type-minimal"]';
  normalPodcast = 'div[class="podo-player-wrapper"]';
  minimalPodcast = 'div[class="podo-player-wrapper small"]';

  public clickOnAddPodcast() {
    cy.get(this.clickAddPodcast).should('contain', "Add podcast");
    cy.get('div').contains('Add podcast', { timeout: 15000 }).click();
  }

  public enterPodcastURL(url: string) {
    cy.get(this.enterPodcastTestUrl, { timeout: 5000 }).type(url).wait(3000);
  }

  public selectNormalPodcast() {
    cy.get(this.podcastNormal, { timeout: 5000 }).should('be.visible').click();
    cy.get('button').contains('Next', { timeout: 5000 }).should('be.visible').click();
  }

  public selectMinimalPodcast() {
    cy.get(this.podcastMinimal, { timeout: 5000 }).should('be.visible').click();
    cy.get('button').contains('Next', { timeout: 5000 }).should('be.visible').click();
  }

  public clickOnPopupNextButton() {
    cy.contains('Next').should('be.enabled');
    cy.contains('Next').click();
  }

  public clickOnPopupAddToPageButton() {
    cy.contains('Add to page').should('be.enabled');
    cy.contains('Add to page', { timeout: 5000 }).click();
  }

  public LoginIntoSubscriberView() {
    cy.get(this.subscriberUsername, { timeout: 5000 }).should('exist');
    cy.get(this.subscriberUsername).type(shared.users.subscriberUser.username);
    cy.get(this.subscriberPassword).type("Passw0rd");
    cy.get(this.subcriberLoginButton, { timeout: 8000 }).click();
  }

  public findPodcastInSubscriber() {
    cy.get(this.podcastSubscriber, { timeout: 30000 }).should('be.visible')
  }
}

import { browser, element, by } from 'protractor';

export class Ng2SuperTablePage {
  navigateTo() {
    return browser.get('/');
  }

  getNavbarText() {
    return element(by.css('.navbar-brand')).getText();
  }
}

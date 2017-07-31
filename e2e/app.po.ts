import { browser, element, by } from 'protractor';

export class NgxSuperTablePage {
  navigateTo() {
    return browser.get('/');
  }

  getNavbarText() {
    return element(by.css('.navbar-brand')).getText();
  }
}

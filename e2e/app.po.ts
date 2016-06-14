export class AngularFireTestPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('angular-fire-test-app h1')).getText();
  }
}

import { AngularFireTestPage } from './app.po';

describe('angular-fire-test App', function() {
  let page: AngularFireTestPage;

  beforeEach(() => {
    page = new AngularFireTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('angular-fire-test works!');
  });
});

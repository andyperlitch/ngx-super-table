import { Ng2SuperTablePage } from './app.po';

describe('ngx-super-table App', () => {
  let page: Ng2SuperTablePage;

  beforeEach(() => {
    page = new Ng2SuperTablePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

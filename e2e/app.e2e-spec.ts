import { Ng2SuperTablePage } from './app.po';

describe('ngx-super-table App', () => {
  let page: Ng2SuperTablePage;

  beforeEach(() => {
    page = new Ng2SuperTablePage();
  });

  it('should display navbar title', () => {
    page.navigateTo();
    expect(page.getNavbarText()).toEqual('ngx super table');
  });
});

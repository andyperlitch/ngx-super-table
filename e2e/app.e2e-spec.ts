import { NgxSuperTablePage } from './app.po';

describe('ngx-super-table App', () => {
  let page: NgxSuperTablePage;

  beforeEach(() => {
    page = new NgxSuperTablePage();
  });

  it('should display navbar title', () => {
    page.navigateTo();
    expect(page.getNavbarText()).toEqual('ngx super table');
  });
});

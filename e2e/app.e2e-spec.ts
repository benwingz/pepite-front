import { PepiteFrontPage } from './app.po';

describe('pepite-front App', () => {
  let page: PepiteFrontPage;

  beforeEach(() => {
    page = new PepiteFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

import { SPAuiNGPage } from './app.po';

describe('SPAuiNG App', function() {
  let page: SPAuiNGPage;

  beforeEach(() => {
    page = new SPAuiNGPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

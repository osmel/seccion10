import { Seccion10Page } from './app.po';

describe('seccion10 App', function() {
  let page: Seccion10Page;

  beforeEach(() => {
    page = new Seccion10Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

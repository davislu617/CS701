import { CS701ProjectPage } from './app.po';

describe('cs701-project App', () => {
  let page: CS701ProjectPage;

  beforeEach(() => {
    page = new CS701ProjectPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

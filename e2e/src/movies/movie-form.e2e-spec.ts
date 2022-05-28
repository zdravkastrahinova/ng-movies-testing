import { MovieFormPage } from './movie-form.po';
import { browser } from 'protractor';

describe('Books Add Edit Page', () => {
  let page: MovieFormPage;

  beforeEach(() => {
    page = new MovieFormPage();
  });

  it('should have proper labeling when it is loaded in create mode', async () => {
    await page.navigateTo();

    expect(await page.getPageTitleText()).toEqual('Add new movie');
    expect(await page.getSubmitButtonText()).toEqual('Save');
    expect(await page.getBackButtonText()).toEqual('Back to list');
  });

  it('should a proper labeling when it is loaded in create mode', async () => {
    await page.navigateToPageInEditMode();

    expect(await page.getPageTitleText()).toEqual('Update movie');
    expect(await page.getSubmitButtonText()).toEqual('Save');
    expect(await page.getBackButtonText()).toEqual('Back to list');
  });
});

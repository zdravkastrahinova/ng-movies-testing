import { MoviesListPage } from './movies-list.po';
import { browser } from 'protractor';
import { MovieFormPage } from './movie-form.po';

describe('Movies list page', () => {

  let page: MoviesListPage;

  beforeEach(() => {
    page = new MoviesListPage();
  });

  it('should have proper labeling when it is loaded ', async () => {
    await page.navigateTo();

    expect(await page.getPageTitleText()).toEqual('Movies list');
    expect(await page.getAddButtonText()).toEqual('Add new');
  });

  it('should list all movies when page is initially loaded', async () => {
    await page.navigateTo();

    const items = await page.getListElements();
    expect(items.length).not.toBe(0);
  });

  it('should navigate to create movie page', () => {
    page.navigateTo().then(() => {
      page.getAddButton().then((button) => {
        button.click();

        browser.getCurrentUrl().then((url) => {
          expect(url).toEqual(`${browser.baseUrl}movies/add`);
        });
      });
    });
  });

  it('should navigate to list after new movie is added', () => {
    const movieFormPage = new MovieFormPage();

    page.navigateTo().then(() => {
      page.getAddButton().then((addButton) => {
        addButton.click();

        movieFormPage.getSubmitButton().then((submitButton) => {
          browser.ExpectedConditions.visibilityOf(submitButton);

          movieFormPage.populateForm('testing title', 'testing description').then(() => {
            submitButton.click();

            browser.getCurrentUrl().then((url) => {
              expect(url).toEqual(browser.baseUrl);
            });
          });
        });
      });
    });
  });

  it('should add movie to list', () => {
    const movieFormPage = new MovieFormPage();

    page.navigateTo().then(() => {
      page.getAddButton().then((addButton) => {
        addButton.click();

        movieFormPage.getSubmitButton().then((submitButton) => {
          browser.ExpectedConditions.visibilityOf(submitButton);

          movieFormPage.populateForm('testing movie', 'testing movie').then(() => {
            submitButton.click();

            browser.ExpectedConditions.presenceOf(addButton);

            page.getListElements().then((elements) => {
              elements.count().then((c) => {
                expect(c).toEqual(3);
              });
            });
          });
        });
      });
    });
  });
});

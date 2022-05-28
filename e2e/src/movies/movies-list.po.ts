import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

export class MoviesListPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getPageTitleText(): Promise<string> {
    return element(by.tagName('h1')).getText();
  }

  async getAddButtonText(): Promise<string> {
    return element(by.css('[data-test-selector=button-add]')).getText();
  }

  async getAddButton(): Promise<ElementFinder> {
    return element(by.css('[data-test-selector=button-add]'));
  }

  async getListElements(): Promise<ElementArrayFinder> {
    return element.all(by.tagName('app-movie-item'));
  }
}

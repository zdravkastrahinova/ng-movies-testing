import { browser, by, element, ElementFinder } from 'protractor';

export class MovieFormPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(`${browser.baseUrl}movies/add`);
  }

  async navigateToPageInEditMode(): Promise<unknown> {
    return browser.get(`${browser.baseUrl}movies/edit/1`);
  }

  async getPageTitleText(): Promise<string> {
    return element(by.css('[data-test-selector=form-title]')).getText();
  }

  async getSubmitButtonText(): Promise<string> {
    return element(by.css('[data-test-selector=button-save]')).getText();
  }

  async getBackButtonText(): Promise<string> {
    return element(by.css('[data-test-selector=button-back]')).getText();
  }

  async getPageTitle(): Promise<ElementFinder> {
    return element(by.tagName('h4'));
  }

  async getBackButton(): Promise<ElementFinder> {
    return element(by.css('[data-test-selector=button-back]'));
  }

  async getSubmitButton(): Promise<ElementFinder> {
    return element(by.css('[data-test-selector=button-save]'));
  }

  async populateForm(title: string, description: string): Promise<void> {
    element(by.name('title')).sendKeys(title);
    element(by.name('description')).sendKeys(description);
  }
}

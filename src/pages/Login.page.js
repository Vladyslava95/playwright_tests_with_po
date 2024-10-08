import { BasePage } from './Base.page';

export class LoginPage extends BasePage {
   get userNameInput() {return this.page.locator('#user-name')};

   get passwordInput() {return this.page.locator('#password')};

   get loginButton() {return this.page.locator('#login-button')};

    async performLogin(userName, password) {
        await this.userNameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

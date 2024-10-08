import { BasePage } from './Base.page';

export class BaseSwagLabPage extends BasePage {
    // header
   get mainMenuBtn() {return this.page.locator('TBD')};

   get shoppingCart() {return this.page.locator('.shopping_cart_link')};

   get shoppingCartBadge() {return this.page.locator('.shopping_cart_badge')};

    async getNumberOfItemsInCart() {
        return this.shoppingCartBadge.textContent();
    }
    async openCartPage() {
        await this.shoppingCart.click();
    }
}

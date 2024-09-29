import { BaseSwagLabPage } from './BaseSwagLab.page';

export class ShoppingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector =  this.page.locator('.cart_item');

    get removeItemSelector() {return this.page.locator ('[id^="remove"]')};

    get cartItemName() { return this.page.locator('.inventory_item_name')};

    get cartDescription() { return this.page.locator('.inventory_item_desc')};

    get cartPrice() {return this.page.locator('.inventory_item_price')}; 

    get headerTitle() {return this.page.locator('.title')};

    cartItems =  this.page.locator(this.cartItemSelector);
    

    // async below added to show the function returns a promise
     async getCartItemByName(name) {
        return this.page.locator(this.cartItemSelector, { hasText: name});
    }  
    async getCartNames() {
        return this.cartItemName.allTextContents();
    }

    async getCartDescriptions() {
        return this.cartDescription.allTextContents();
    }

    async getCartPrices() {
        return  this.cartPrice.allTextContents();        
    }        

    async removeCartItemByName(name) {
        const item = await this.getCartItemByName(name);
        return item.locator(this.removeItemSelector);
    }

    async removeCartItemById(id) {
        await this.cartItems.nth(id).locator(this.removeItemSelector).click();
    }

    async getCartItemName() {
        return this.cartItemName.allTextContents();
    }  
     
  
}

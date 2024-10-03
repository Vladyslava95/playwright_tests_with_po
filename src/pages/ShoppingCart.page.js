import { BaseSwagLabPage } from './BaseSwagLab.page';

export class ShoppingCartPage extends BaseSwagLabPage {
    url = '/cart.html';
   

    get removeItemSelector() {return this.page.locator ('[id^="remove"]')};

    get cartItemName() { return this.page.locator('.inventory_item_name')};

    get cartDescription() { return this.page.locator('.inventory_item_desc')};

    get cartPrice() {return this.page.locator('.inventory_item_price')}; 

    get headerTitle() {return this.page.locator('.title')};
    
    get cartItems() { return this.page.locator('.cart_item'); }
    
    get checkoutButton () {return this.page.locator ('[id^="checkout"]')};

    // async below added to show the function returns a promise
     async getCartItemByName(name) {
        return this.page.locator(this.cartItemSelector, { hasText: name});
    }             

    async removeCartItemByName(name) {
        const item = await this.getCartItemByName(name);
        return item.locator(this.removeItemSelector);
    }

    async removeCartItemById(id) {
        await this.cartItems.nth(id).locator(this.removeItemSelector).click();
    }
   
    async openCheckoutPage() {
        return this.checkoutButton.click();
    }  
    
    async getCartItemsList() {
        return this.getItemsListData(await this.cartItems.all());
    }
    async getItemsListData(items) {
        const itemsData = [];
    
        for (const item of items) {
            const name = await item.locator(this.cartItemName).textContent();
            const description = await item.locator(this.cartDescription).textContent();
            let price = await item.locator(this.cartPrice).textContent();
            price = price.replace('$', '');
    
            itemsData.push({
                name,
                description,
                price,
            });
        }
        return itemsData;
    }
  
}

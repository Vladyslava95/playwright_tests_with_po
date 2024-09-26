import { BaseSwagLabPage } from './BaseSwagLab.page';

export class InventoryPage extends BaseSwagLabPage {

    url = '/inventory.html';

    headerTitle = this.page.locator('.title');

    inventoryItems = this.page.locator('.inventory_item');

    get inventoryItemName() { return this.page.locator('.inventory_item_name'); }

    get inventoryPrice() { return this.page.locator('.inventory_item_price'); }   

    addItemToCartButton = this.page.locator('[id^="add-to-cart"]');

    sortDropdown = this.page.locator('.product_sort_container');     
   

   async addItemToCartById(id) {
        await this.addItemToCartButton.nth(id).click();
   }       
    
}

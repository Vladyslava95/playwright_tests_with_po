import { BaseSwagLabPage } from './BaseSwagLab.page';

export class InventoryPage extends BaseSwagLabPage {

    url = '/inventory.html';

    get headerTitle() { return this.page.locator('.title')};

    get inventoryItems() {return this.page.locator('.inventory_item')};

    get inventoryItemName() { return this.page.locator('.inventory_item_name')};

    get inventoryDescription() { return this.page.locator('.inventory_item_desc')};

    get inventoryPrice() {return this.page.locator('.inventory_item_price')}; 

    get addItemToCartButton() {return this.page.locator('[id^="add-to-cart"]')};

    get sortDropdown() {return this.page.locator('.product_sort_container')};      
   

   async addItemToCartById(id) {
        await this.addItemToCartButton.nth(id).click();
    } 

     async getInventoryItemsList() {
        return this.getItemsListData(await this.inventoryItems.all());
    }
    
    async getItemsListData(items) {
        const itemsData = await Promise.all(items.map(async (item) => {
            const name = await item.locator(this.inventoryItemName).textContent();
            const description = await item.locator(this.inventoryDescription).textContent();
            let price = await item.locator(this.inventoryPrice).textContent();
            price = price.replace('$', '');
            
            return {
                name,
                description,
                price,
            };
        }));
        
        return itemsData;
    }

    async addRandomInventoriesToCart(array) {            
        const inventoryItemsAvailable = await this.inventoryItems.all();        
        const inventoryItemsAdded = [];       
        
        for (const index of array) {
            await inventoryItemsAvailable[index].locator(this.addItemToCartButton).click();
            inventoryItemsAdded.push(inventoryItemsAvailable[index]);
        }       
       
        return this.getItemsListData(inventoryItemsAdded);
    }
   
    async calculateRandomItemsArray(itemAmount, count) {
        const indexes = new Set();    
        
        while (indexes.size < count) {
            const randomIndex = Math.floor(Math.random() * itemAmount);
            indexes.add(randomIndex);
        }    
        return Array.from(indexes); 
    }
}

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
   async addRandomProductsToCart() {
          const inventories = await this.addItemToCartButton.all();  
          const randomNum =  Math.max(1, Math.floor(Math.random() * inventories.length));; 
          const addedInventories = [];  
          const randomIndex = Array.from({ length: randomNum }, () => 
               Math.floor(Math.random() *inventories.length)
           );
               
          for (let index of randomIndex) {
              const inventoryName = await this.inventoryItemName.nth(index).textContent();
              const inventoryDescription = await this.inventoryDescription.nth(index).textContent();
              const inventoryPrice = await this.inventoryPrice.nth(index).textContent();
              
              addedInventories.push({ name: inventoryName.trim(), description: inventoryDescription.trim(), price: inventoryPrice.trim() });
              
              await inventories[index].click();
          } 
           return addedInventories;
      }
  }   
    


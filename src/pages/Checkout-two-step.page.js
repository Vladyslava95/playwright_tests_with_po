import { BaseSwagLabPage } from './BaseSwagLab.page';


export class CheckoutTwoStepPage extends BaseSwagLabPage {
    url = '/checkout-step-two.html';  

    get inventoryItems() {return this.page.locator('.cart_item')};
         
    get inventoryItemName() { return this.page.locator('.inventory_item_name')};

    get inventoryDescription() { return this.page.locator('.inventory_item_desc')};

    get inventoryPrice() {return this.page.locator('.inventory_item_price')}; 

    get itemsSubTotal() { return this.page.locator('.summary_subtotal_label')};

    get tax() { return this.page.locator('.summary_tax_label')};

    get itemsTotal() {return this.page.locator('.summary_total_label')}; 

   async getCheckoutItemsLst() {
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
async getPriceTotal() {
   let priceTotal = await this.itemsTotal.textContent();
   priceTotal = parseFloat(priceTotal.replace('Total: $', ''));
   return priceTotal;
}

async getSubTotal() {
   let subTotal = await this.itemsSubTotal.textContent();
   subTotal = parseFloat(subTotal.replace('Item total: $', ''));
   return subTotal;
}

async getTax() {
   let tax = await this.tax.textContent();
   tax = parseFloat(tax.replace('Tax: $', ''));
   return tax;
}   

async calculateItemTotal(inventoryList, randomInventories) {
   let totalPrice = 0;
   for (let i of randomInventories){
       let price = await inventoryList[i].price;
       price = parseFloat(price.replace('$', ''));
       totalPrice += price;
   }
   return totalPrice;
}
       
}


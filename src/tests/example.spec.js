import { expect } from '@playwright/test';
import { test } from '../fixtures/base';

test.beforeEach(async ({app}) => {   
    await app.login.navigate();
    await app.login.performLogin('standard_user', 'secret_sauce');
    await expect(app.inventory.headerTitle).toBeVisible();
    expect(await app.inventory.inventoryItems.count()).toBeGreaterThanOrEqual(1);
});


test.describe('Saucedemo app basic tests', () => {   

    test('should add and remove product from the cart', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {        
        await app.inventory.addItemToCartById(0);
        expect(await app.inventory.getNumberOfItemsInCart()).toBe('1');

        await app.inventory.shoppingCart.click();
        expect(await app.shoppingCart.cartItems.count()).toBeGreaterThanOrEqual(1);

        await app.shoppingCart.removeCartItemById(0);
        await expect(app.shoppingCart.cartItems).not.toBeAttached();
    });
});

test.describe('Saucedemo Unit 10 tests', () => {
    const sortOption = [
        {sort: "za", sortByName: (inventoryInitialOrder) => {
            return inventoryInitialOrder.sort((a, b) => b.localeCompare(a));
            }},
        {sort: "az", sortByName: (inventoryInitialOrder) => {
                return inventoryInitialOrder.sort();
            }},            
        {sort: "lohi", sortByPrice: (inventoryInitialOrder) => {
                return inventoryInitialOrder.sort((a, b) => Number(a) - Number(b));
            }},
        {sort: "hilo", getExpectedResultPrice: (productPriceInitialOrderToNumbers) => {
                return productPriceInitialOrderToNumbers.sort((a, b) => Number(b) - Number(a));
            }}

    ];

    for(const option of sortOption) {
        test(` inventory sorting by ${option.sort}`, async (
            /** @type {{ app: import('../pages/Application').Application }} */{ app },
        ) => {       
             if (option.sortByName) {
                const inventoryInitialOrder = await app.inventory.inventoryItemName.allTextContents();
                await app.inventory.sortDropdown.selectOption({ value: option.sort});
                const actualOrder = await app.inventory.inventoryItemName.allTextContents();
                const expectedOrder = option.sortByName(inventoryInitialOrder)
                expect(actualOrder).toEqual(expectedOrder);

             }  
             if (option.sortByPrice) {
                const inventoryInitialOrder = await app.inventory.inventoryPrice.allTextContents();
                await app.inventory.sortDropdown.selectOption({ value: option.sort});
                const inventoryInitialOrderToNumbers = inventoryInitialOrder.map((str) => parseFloat(str.replace('$', '')));
                const actualOrder = ((await app.inventory.inventoryPrice.allTextContents()).map((str) => parseFloat(str.replace('$', ''))));
                const expectedOrder = option.sortByPrice(inventoryInitialOrderToNumbers)
                expect(actualOrder).toEqual(expectedOrder);

             }    
          
            
         });

    };      
   
    test('adding to cart several products', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {    
        const addedProducts =  await app.inventory.addRandomProductsToCart();    
        await app.baseSwagLab.openCartPage();
        const cartItemNames = await app.shoppingCart.getCartNames();
        const cartItemDescriptions = await app.shoppingCart.getCartDescriptions();
        const cartItemPrices = await app.shoppingCart.getCartPrices();

        addedProducts.forEach((item) => {
            expect(cartItemNames).toContain(item.name);
            expect(cartItemDescriptions).toContain(item.description);
            expect(cartItemPrices).toContain(item.price);
        });                 
        
    
    });                
        
 });





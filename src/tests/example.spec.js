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

    const sortByNameOptions = [
        { sort: "za", sortByName: (inventoryInitialOrder) => inventoryInitialOrder.sort((a, b) => b.localeCompare(a)) },
        { sort: "az", sortByName: (inventoryInitialOrder) => inventoryInitialOrder.sort() }
    ];

    for (const option of sortByNameOptions) {
        test(`Inventory sorting by name: ${option.sort}`, async (
            /** @type {{ app: import('../pages/Application').Application }} */ { app },
        ) => {
            const inventoryInitialOrder = await app.inventory.inventoryItemName.allTextContents();
            await app.inventory.sortDropdown.selectOption({ value: option.sort });
            const actualOrder = await app.inventory.inventoryItemName.allTextContents();
            const expectedOrder = option.sortByName(inventoryInitialOrder);
            expect(actualOrder).toEqual(expectedOrder);
        });
    };

    const sortByPriceOptions = [
        { sort: "lohi", sortByPrice: (inventoryInitialOrder) => inventoryInitialOrder.sort((a, b) => a - b) },
        { sort: "hilo", sortByPrice: (inventoryInitialOrder) => inventoryInitialOrder.sort((a, b) => b - a) }
    ];

    for (const option of sortByPriceOptions) {
        test(`Inventory sorting by price: ${option.sort}`, async (
            /** @type {{ app: import('../pages/Application').Application }} */ { app },
        ) => {
            const inventoryInitialOrder = await app.inventory.inventoryPrice.allTextContents();
            const inventoryInitialOrderToNumbers = inventoryInitialOrder.map((str) => parseFloat(str.replace('$', '')));
            await app.inventory.sortDropdown.selectOption({ value: option.sort });
            const actualOrder = (await app.inventory.inventoryPrice.allTextContents()).map((str) => parseFloat(str.replace('$', '')));
            const expectedOrder = option.sortByPrice(inventoryInitialOrderToNumbers);
            expect(actualOrder).toEqual(expectedOrder);
        });
    };
      
   
    test('adding to cart several products', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {    
        const inventoryList = await app.inventory.getInventoryItemsList();
        const amount = inventoryList.length;

        const randomInventories = await app.inventory.calculateRandomItemsArray(amount, 2);
        const addedInventoriesData = await app.inventory.addRandomInventoriesToCart(randomInventories);
        await app.baseSwagLab.openCartPage();
        const inventoryAddedToCart = await app.shoppingCart.getCartItemsList();

        for (const i in addedInventoriesData) {
            expect(addedInventoriesData[i].name).toEqual(inventoryAddedToCart[i].name);
            expect(addedInventoriesData[i].description).toEqual(inventoryAddedToCart[i].description);
            expect(addedInventoriesData[i].price).toEqual(inventoryAddedToCart[i].price);
        }                  
    
    });                      
        
 });

 test('checkout flow', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {    
        const inventoryList = await app.inventory.getInventoryItemsList();
        const amount = inventoryList.length;
        const randomInventories = await app.inventory.calculateRandomItemsArray(amount, 2);
        const addedInventoriesData = await app.inventory.addRandomInventoriesToCart(randomInventories);

        await app.baseSwagLab.openCartPage();   
        await app.checkoutFirstStep.openCheckoutPage();
        await app.checkoutFirstStep.fillUserData();  
        await app.checkoutFirstStep.openCheckoutTwoPage(); 
        const checkoutInventoryItems = await app.checkoutTwoStep.getCheckoutItemsList();

   
        for (const i in addedInventoriesData) {
            expect.soft(addedInventoriesData[i].name).toEqual(checkoutInventoryItems[i].name);
            expect.soft(addedInventoriesData[i].description).toEqual(checkoutInventoryItems[i].description);
            expect.soft(addedInventoriesData[i].price).toEqual(checkoutInventoryItems[i].price);
        }
        
        const subTotalActual = await app.checkoutTwoStep.getSubTotal();
        const subTotalExpected = await app.checkoutTwoStep.calculateItemTotal(inventoryList, randomInventories);
        expect(subTotalActual).toEqual(subTotalExpected);
        const tax = await app.checkoutTwoStep.getTax();
        const totalPriceActual = await app.checkoutTwoStep.getPriceTotal();

        let totalPriceExpected = subTotalExpected + tax;        
        totalPriceExpected = parseFloat(totalPriceExpected.toFixed(2));       
        expect(totalPriceActual).toEqual(totalPriceExpected);
                       
     }); 





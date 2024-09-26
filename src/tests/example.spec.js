import { expect } from '@playwright/test';
import { test } from '../fixtures/base';

test.describe('Saucedemo app basic tests', () => {
    test('should login successfully', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.login.navigate();
        await app.login.performLogin('standard_user', 'secret_sauce');

        await expect(app.inventory.headerTitle).toBeVisible();

        expect(await app.inventory.inventoryItems.count()).toBeGreaterThanOrEqual(1);
    });

    test('should add and remove product from the cart', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.login.navigate();
        await app.login.performLogin('standard_user', 'secret_sauce');
        await app.inventory.addItemToCartById(0);
        expect(await app.inventory.getNumberOfItemsInCart()).toBe('1');

        await app.inventory.shoppingCart.click();
        expect(await app.shoppingCart.cartItems.count()).toBeGreaterThanOrEqual(1);

        await app.shoppingCart.removeCartItemById(0);
        await expect(app.shoppingCart.cartItems).not.toBeAttached();
    });
});

test.describe('Saucedemo Unit 10 tests', () => {
    test('sorting z-a', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.login.navigate();
        await app.login.performLogin('standard_user', 'secret_sauce');       
        
        const zaOption =  {sort: "za", getExpectedResult: (inventoryInitialOrder) => {
            return inventoryInitialOrder.sort((a, b) => b.localeCompare(a));
            }}        
        const inventoryInitialOrder = await app.inventory.inventoryItemName.allTextContents();
        await app.inventory.sortDropdown.selectOption({ value: zaOption.sort});
        const actualOrder = await app.inventory.inventoryItemName.allTextContents();
        const expectedOrder = zaOption.getExpectedResult(inventoryInitialOrder)
        expect(actualOrder).toEqual(expectedOrder);

        const azOption = {sort: "az", getExpectedResult: (inventoryInitialOrder) => {
            return productInitialOrder.sort();
            }}        

    });
    test('sorting a-z', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.login.navigate();
        await app.login.performLogin('standard_user', 'secret_sauce');
        const azOption = {sort: "az", getExpectedResult: (inventoryInitialOrder) => {
            return inventoryInitialOrder.sort();
            }}        

        const inventoryInitialOrder = await app.inventory.inventoryItemName.allTextContents();
        await app.inventory.sortDropdown.selectOption({ value: azOption.sort});
        const actualOrder = await app.inventory.inventoryItemName.allTextContents();
        const expectedOrder = azOption.getExpectedResult(inventoryInitialOrder)
        expect(actualOrder).toEqual(expectedOrder);
        
    });

    test('sorting lo-hi', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.login.navigate();
        await app.login.performLogin('standard_user', 'secret_sauce');

        const lohiOption = {sort: "lohi", getExpectedResult: (inventoryInitialOrder) => {
             return inventoryInitialOrder.sort((a, b) => Number(a) - Number(b));
        }}
        
        const inventoryInitialOrder = await app.inventory.inventoryPrice.allTextContents();
        await app.inventory.sortDropdown.selectOption({ value: lohiOption.sort});
        const inventoryInitialOrderToNumbers = inventoryInitialOrder.map((str) => parseFloat(str.replace('$', '')));
        const actualOrder = ((await app.inventory.inventoryPrice.allTextContents()).map((str) => parseFloat(str.replace('$', ''))));
        const expectedOrder = lohiOption.getExpectedResult(inventoryInitialOrderToNumbers)
        expect(actualOrder).toEqual(expectedOrder);
       
    });
    
    test('sorting hi-lo', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.login.navigate();
        await app.login.performLogin('standard_user', 'secret_sauce');

        const hiloOption =  {sort: "hilo", getExpectedResultPrice: (productPriceInitialOrderToNumbers) => {
            return productPriceInitialOrderToNumbers.sort((a, b) => Number(b) - Number(a));
         }}

        const inventoryInitialOrder = await app.inventory.inventoryPrice.allTextContents();
        await app.inventory.sortDropdown.selectOption({ value: hiloOption.sort});
        const inventoryInitialOrderToNumbers = inventoryInitialOrder.map((str) => parseFloat(str.replace('$', '')));
        const actualOrder = ((await app.inventory.inventoryPrice.allTextContents()).map((str) => parseFloat(str.replace('$', ''))));
        const expectedOrder = hiloOption.getExpectedResultPrice(inventoryInitialOrderToNumbers);
        expect(actualOrder).toEqual(expectedOrder);
        
    });
});




import { BaseSwagLabPage } from './BaseSwagLab.page';
import casual from 'casual';

export class CheckoutFirstStepPage extends BaseSwagLabPage {
    url = '/checkout-step-one.html';
    

    get customerName() {return this.page.locator ('[id="first-name"]')};

    get customerSurname() { return this.page.locator('[id="last-name"]')};

    get customerZipcode() { return this.page.locator('[id="postal-code"]')};   
    
    get checkoutButton () {return this.page.locator ('[id="checkout"]')};  
    
    get continueButton () {return this.page.locator ('[id="continue"]')};  

    async fillUserData(firstName = casual.first_name, lastName = casual.last_name, zip = casual.building_number) {
      await this.customerName.fill(firstName);
      await this.customerSurname.fill(lastName);
      await this.customerZipcode.fill(zip);
  }
     
     async openCheckoutPage () {   
        await this.checkoutButton.click();        
     }  

     async openCheckoutTwoPage () {   
        await this.continueButton.click();        
     }
       
}


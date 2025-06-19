import { expect, Locator, Page } from "@playwright/test"

export class LoginPage{
//login 
private readonly usernameTextbox: Locator
private readonly passwordTextbox: Locator
private readonly loginButton: Locator
private readonly shoppingCartIcon : Locator

//Localización de elementos en el constructor
constructor(page: Page){

    this.usernameTextbox = page.getByRole('textbox', {name: 'Username'})
    this.passwordTextbox = page.getByRole('textbox', {name: 'Password'})
    this.loginButton = page.getByRole('button', {name: 'Login'})
    this.shoppingCartIcon = page.locator('xpath=//a[@class="shopping_cart_link"]')
}

//interacción con los elementos
async fillUsername(username:string){
   await this.usernameTextbox.fill(username)
}
async fillPassword(password:string){
   await this.passwordTextbox.fill(password)
}
    
async clickOnLogin(){    
   await this.loginButton.click()
}

async loginWithCredentials(username:string, password:string)
{
    await this.fillUsername(username)
    await this.fillPassword(password)
    await this.clickOnLogin()
}

async checkSuccessFulLogin(){
    await expect(this.shoppingCartIcon).toBeVisible()
}

}
import { test, expect } from '@playwright/test';
import { constants } from 'buffer';
import { LoginPage } from './pageobjects/LoginPage';
test('Test 1', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  //login
  
  /*await page.getByRole('textbox', {name: 'Username'}).fill("standard_user")
  await page.getByRole('textbox', {name: 'Password'}).fill("secret_sauce")
  await page.getByRole('button', {name: 'Login'}).click()*/

  //('//div[@id="inventory_container"]/inventory_list')
  
  const varlogin = new LoginPage(page)
  await varlogin.loginWithCredentials("standard_user","secret_sauce")
  await varlogin.checkSuccessFulLogin()

  // Espera por items y elige uno al azar
  const itemsContainer = await page.locator('#inventory_container .inventory_item').all()
  const randomIndex = Math.floor(Math.random() * itemsContainer.length);
  const randomItem = itemsContainer[randomIndex]
  const expectedName = await randomItem.locator('.inventory_item_name').innerText()
  const expectedDescription = await randomItem.locator('.inventory_item_description').innerText()
  const expectedPrice = await randomItem.locator('.inventory_item_price').innerText()
  
  
  console.log(`Name: ${expectedName} Description: ${expectedDescription} Price: ${expectedPrice}`);

  await randomItem.getByRole('button', {name: 'Add to cart'}).click();

  await page.locator('a.shopping_cart_link').click();

  expect(page.getByRole('button',{name:'checkout'})).toBeVisible();

  const actualName = await page.locator('.cart_item_label .inventory_item_name').innerText()
  const actualDescription = await page.locator('.cart_item_label .inventory_item_desc').innerText()
  const actualPrice = await page.locator('.cart_item_label .inventory_item_price').innerText()


  expect(actualName).toEqual(expectedName)
  //expect(expectedDescription).toEqual(actualDescription)
  expect(actualPrice).toEqual(expectedPrice)


  await page.getByRole('button', {name: 'Checkout'}).click()
  await page.getByRole('textbox', {name: 'First Name'}).fill("Goku")
  await page.getByRole('textbox', {name: 'Last Name'}).fill("Sayayin")
  await page.getByRole('textbox', {name: 'Zip/Postal Code'}).fill("11000")
  await page.getByRole('button', {name: 'Continue'}).click()
  await page.getByRole('button', {name: 'Finish'}).click()

  await expect(page.getByRole('heading',{name:'Thank you for your order!'})).toBeVisible();


});

test('test 1 POM', async ({ page }) => {
  
  await page.goto('https://www.saucedemo.com/');
  //login
  const varlogin = new LoginPage(page)
  await varlogin.fillUsername("problem_user")
  await varlogin.fillPassword("secret_sauce")
  await varlogin.clickOnLogin()

});


test('test 2 POM', async ({ page }) => {
  
  await page.goto('https://www.saucedemo.com/');
  //login
  const varlogin = new LoginPage(page)
  await varlogin.loginWithCredentials("standard_user","secret_sauce")
  await varlogin.checkSuccessFulLogin()
});

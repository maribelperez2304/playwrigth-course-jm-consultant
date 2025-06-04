import { test, expect } from '@playwright/test';
import { constants } from 'buffer';

test('Test 1', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  //login
  await page.getByRole('textbox', {name: 'Username'}).fill("standard_user")
  await page.getByRole('textbox', {name: 'Password'}).fill("secret_sauce")
  await page.getByRole('button', {name: 'Login'}).click()

  //('//div[@id="inventory_container"]/inventory_list')
  const itemsContainer = await page.locator('#inventory_container .inventory_item').all()
  const randomIndex = Math.floor(Math.random() * itemsContainer.length);
  const randomItem = itemsContainer[randomIndex]

  const expectedName = await randomItem.locator('.inventory_item_name').innerText()
  const expectedDescription = await randomItem.locator('.inventory_item_description').innerText()
  const expectedPrice = await randomItem.locator('.pricebar').innerText()

  console.log(`Name: ${expectedName} Description: ${expectedDescription} Price: ${expectedPrice}`);
  
  await randomItem.getByRole('button', {name: 'Add to cart'}).click();
 
  await page.locator('a.shopping_cart_link').click();
 

  expect(page.getByRole('button',{name:'checkout'})).toBeVisible()

  const actualName = await randomItem.locator('.inventory_item_name').innerText()
  const actualDescription = await randomItem.locator('.inventory_item_description').innerText()
  const actualPrice = await randomItem.locator('.pricebar').innerText()

  expect(actualName).toEqual(expectedName)
  expect(actualDescription).toEqual(expectedDescription)
  expect(actualPrice).toEqual(expectedPrice)
  await page.pause()
  




});
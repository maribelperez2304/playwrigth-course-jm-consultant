import { test, expect } from '@playwright/test';
import { title } from 'process';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('test 3', async ({ page }) => {
    await page.goto('https://www.mercadolibre.com.co/')
    
    await page.locator('input[id="cb1-edit"]').fill('iphone')
    await page.keyboard.press("Enter")
    await expect(page.locator("//ol[contains(@class, 'ui-search-layout')]")).toBeVisible();
    //await page.pause()

    const titles = await page.locator("//ol[contains(@class, 'ui-search-layout')]//li//h3").allInnerTexts();

    console.log('The total number of result is:', titles.length)
    for (let title of titles){
      console.log('El titulo es: ', title)
    }
});


test('test locators', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/index.html')
  
    //xpath
    await page.locator('//input[@id="userName"]').fill("mperez")

    //selector
    await page.locator('input[type="email"]').fill("mperezp@prueba.com")

    //xpath
    await page.locator('xpath=//input[@name="password"]').fill("1234abc")
    

    //selector
    await page.locator('input[id="phoneNumber"]').fill("3185555555")

    //selector y dar clic
    await page.click('button[type="submit"]')

    await page.pause()

});


test('test locators getByRole', async ({ page }) => {
    await page.goto('https://www.mercadolibre.com.co/')
    
    //await page.getByRole('link', {name: 'Mis compras'}).click()
    await page.getByRole('link', {name: 'Ingresa', exact: true}).click()
    await page.pause()
});
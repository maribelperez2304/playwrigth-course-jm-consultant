import { test, expect } from '@playwright/test';

test('test Record', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.co/');
  await page.getByRole('combobox', { name: 'Ingresa lo que quieras' }).click();
  await page.getByRole('combobox', { name: 'Ingresa lo que quieras' }).fill('IPHONE');
  await page.getByRole('combobox', { name: 'Ingresa lo que quieras' }).press('Enter');
  await page.getByRole('link', { name: 'Apple iPhone 16 Pro Max (256' }).first().click();
  await page.getByRole('link', { name: 'Apple iPhone 16 Pro Max (256' }).click();
 

});
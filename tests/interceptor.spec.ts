import { test, expect } from '@playwright/test';
import { constants } from 'buffer';
import { LoginPage } from './pageobjects/LoginPage';

  test('Test Sin Imagenes', async ({ page }) => {

  //capturar las peticiones
  await page.on("request", (req) =>{
    console.log(req.url())
  })

  //no carga recursos de imagenes
  await page.route(
    "**/*.{png,svg,jpeg,jpg}",
    (route) => route.abort()
  )
  await page.route(
    "https://www.saucedemo.com/static/media/bike-light-1200x1500.37c843b0.jpg",
    (route) => route.abort()
  )
  await page.goto('https://www.saucedemo.com/');

  //login
  const varlogin = new LoginPage(page)
  await varlogin.fillUsername("problem_user")
  await varlogin.fillPassword("secret_sauce")
  await varlogin.clickOnLogin()
  const itemsContainer = await page.locator("#inventory_container .inventory_item").all()
  await page .screenshot({path:'login.png', fullPage:true})
})


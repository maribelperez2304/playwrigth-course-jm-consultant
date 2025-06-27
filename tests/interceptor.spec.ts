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
});

  test('Test modificando response', async ({ page }) => {
    
  //el servicio devuelve varios libros y vamos a devolver solo uno
  await page.route(
    "https://demoqa.com/BookStore/v1/Books",
    (route) => {
      route.fulfill({
        status: 304,
        headers:{
          'Content-Type': 'application/json'
        },
        body: `
        {
    "books": [
        {
            "isbn": "9781449325862",
            "title": "El libro que Julian nunca escribio",
            "subTitle": "A Working Introduction",
            "author": "Richard E. Silverman",
            "publish_date": "2020-06-04T08:48:39.000Z",
            "publisher": "O'Reilly Media",
            "pages": 234,
            "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
            "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
        }
    ]
}
        `
      })
    }
  )

  await page.goto("https://demoqa.com/books")
  await page.pause()
  await page .screenshot({path:'responseBocks.png', fullPage:true})

})


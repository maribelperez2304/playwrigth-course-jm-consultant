import { test, expect } from '@playwright/test';

test('test 1 web table', async ({ page }) => {
    await page.goto('https://cosmocode.io/automation-practice-webtable/#google_vignette')

    const tableContainer = await page.locator("xpath=//table[@id='countries'")
    const rows = await page.locator("xpath=.//tr").all()
    const countries: Country[] = [] //es un arreglo de paises y se inicializa

    console.log(rows.length)


   /* for(let row of rows)
    {
        console.log(await row.innerText())
    }*/

    for(let row of rows)
    {
       let country: Country = {
           name: await row.locator('xpath=.//td[2]').innerText(),
           capital: await row.locator('xpath=.//td[3]').innerText(),
           currency: await row.locator('xpath=.//td[4]').innerText(),
           primaryLanguage: await row.locator('xpath=.//td[5]').innerText()
       }

       countries.push(country)
    }

    /*for(let allCountries of countries){
        console.log(allCountries)
    }*/

    /*const row1 = rows.at(1)
    const countryName = await row1?.locator('xpath=.//td[2]').innerText()
    const countryCapital = await row1?.locator('xpath=.//td[3]').innerText()
    const countryCurrency = await row1?.locator('xpath=.//td[4]').innerText()
    
    console.log(countryName, countryCapital, countryCurrency)]*/

    const countryWherePeopleSpeakPortugueseandReal = countries.filter
    (country => country.primaryLanguage === "French" && 
    country.capital === "Paris" &&
    country.currency === "Euro; CFP Franc")

    console.log('Countries where people speak portuguese and currency real', countryWherePeopleSpeakPortugueseandReal)

});


interface Country {
    name: string
    capital: string
    currency: string
    primaryLanguage: string
}

/*
elemento container: //table[@id="countries"]
.//tr -> filas

//table[@id="countries"]//tr[2]//td[1] -> Check
//table[@id="countries"]//tr[2]//td[2] -> Country
//table[@id="countries"]//tr[2]//td[3] -> Capital
//table[@id="countries"]//tr[2]//td[4] -> Currency
//table[@id="countries"]//tr[2]//td[5] -> Primary Language

*/
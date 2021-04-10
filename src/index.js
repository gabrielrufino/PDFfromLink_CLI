'use strict'

const puppeteer = require('puppeteer')

;(async () => {
  try {
    const [,, link] = process.argv

    const browser = await puppeteer.launch()

    const page = await browser.newPage()
    await page.goto(link, { waitUntil: 'networkidle0' })

    const title = await page.title()

    await page.pdf({
      path: `${title}.pdf`
    })

    browser.close()
  } catch (error) {
    console.log(error.message)
  }
})()

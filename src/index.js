#!/usr/bin/env node
'use strict'

import fs from 'node:fs'

import puppeteer from 'puppetter'

;(async () => {
  const browser = await puppeteer.launch({headless: true})
  try {
    const [,, link] = process.argv

    const page = await browser.newPage()
    await page.goto(link, { waitUntil: 'networkidle0' })

    const title = await page.title()

    let path = `${process.cwd()}/${title}.pdf`
    for (let i = 1; fs.existsSync(path); i++) {
      path = `${process.cwd()}/${title} ${i}.pdf`
    }

    await page.pdf({
      path,
    })

    browser.close()
  } catch (error) {
    console.log(error.message)
  } finally {
    browser.close()
  }
})()

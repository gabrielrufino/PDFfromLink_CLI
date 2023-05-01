#!/usr/bin/env node

import fs from 'node:fs'
import { join } from 'node:path'

import puppeteer from 'puppeteer'

;(async () => {
  const browser = await puppeteer.launch({ headless: true })
  try {
    const [,, link] = process.argv

    const page = await browser.newPage()
    await page.goto(link, { waitUntil: 'networkidle0' })

    const title = await page.title()

    let path = join(process.cwd(), `${title}.pdf`)
    for (let i = 1; fs.existsSync(path); i++) {
      path = join(process.cwd(), `${title} ${i}.pdf`)
    }

    await page.pdf({
      path
    })
  } catch (error) {
    console.log(error.message)
  } finally {
    browser.close()
  }
})()

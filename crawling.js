const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const { sendEmail } = require('./mailer')

const BADGE_PAGE = 'https://solved.ac/badges?sort=added&direction=desc&page=1'

const getHtml = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true
    })
    const page = await browser.newPage()
    await page.setViewport({
      width: 1366,
      height: 768
    })

    await page.goto(BADGE_PAGE)
    await page.reload()

    html = await page.content()

    await browser.close()
    return html
  } catch (e) {
    console.error(e)
  }
}

const getJson = html => {
  const $ = cheerio.load(html)
  const jsonTxt = $('#__NEXT_DATA__').text()
  return JSON.parse(jsonTxt)
}

exports.getLastestBadge = async () => {
  html = await getHtml()
  json = getJson(html)
  badges = json['props']['pageProps']['badges']['items']

  return badges[0]
}
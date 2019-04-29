const { Builder, By, until } = require('selenium-webdriver')

const DELAY = 0

jest.setTimeout(30000)

describe('selenium', () => {
  let driver
  beforeAll(async () => {
    driver = await new Builder()
      .usingServer('http://selenium:4444/wd/hub')
      // .usingServer('http://sauce-connect:4445/wd/hub')
      .forBrowser('chrome')
      // .withCapabilities({
      //   browserName: 'internet explorer',
      //   username: process.env.SL_USERNAME,
      //   accessKey: process.env.SL_KEY,
      // })
      .build()
  })
  afterAll(async () => {
    await driver.quit()
  })
  test('click on but1 using built in assertion', async () => {
    await driver.get('http://demo:3000')
    const myBut = await driver.findElement(By.id('but1'))
    await myBut.click()
    const myDiv = await driver.findElement(By.id('mydiv'))
    await driver.sleep(DELAY)
    await driver.wait(until.elementTextIs(myDiv, 'lolcats'))
  })
  test('title content using custom assertion', async () => {
    await driver.get('http://demo:3000')
    await driver.wait(() => driver.getTitle().then(title => title === 'Hey ho'))
  })
  test('click on but2 triggers an alert', async () => {
    await driver.get('http://demo:3000')
    const myBut = await driver.findElement(By.id('but2'))
    await myBut.click()
    await driver.sleep(DELAY)
    const alert = await driver.wait(until.alertIsPresent())
    await alert.dismiss()
  })
  test('execute custom javascript', async () => {
    await driver.get('http://demo:3000')
    const color = 'rgba(255, 0, 0, 1)'
    /* eslint-disable */
    await driver.executeAsyncScript(function(color) {
      const callback = arguments[arguments.length - 1]
      document.body.style.backgroundColor = color
      callback()
    }, color)
    /* eslint-enable */
    await driver.sleep(DELAY)
    const body = await driver.findElement(By.css('body'))
    expect(await body.getCssValue('background-color')).toBe(color)
  })
})

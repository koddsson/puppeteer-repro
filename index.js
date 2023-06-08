const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false, devtools: true});
  const page = await browser.newPage();

  await page.goto('https://koddsson.com');
  await page.waitForSelector('title');

  const firedEvent = await page.evaluate(async () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    
    let firedEvent = false;
    input.addEventListener('focus', () => {
      firedEvent = true;
    });
    input.focus();

    // await 2 frames for IE11
    await new Promise(requestAnimationFrame);
    await new Promise(requestAnimationFrame);
    return firedEvent;
  });

  console.assert(firedEvent === true, "%o", { firedEvent });

  await browser.close();
})();

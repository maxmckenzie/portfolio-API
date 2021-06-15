const puppeteer = require('puppeteer');

const getText = async (url, selector, type) => {
  console.log('getText', {url, selector, type})
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)
  const el = await page.waitForSelector(selector)
  let rs
  type === 'list' ?
    rs = await page.evaluate((selector) => Array.from(document.querySelectorAll(selector), el => el.textContent), selector)
  : rs = (await page.evaluate(el => el.textContent, el)).trim().replace(/\s+/g, ' ')
  console.log('rs', rs)
  await page.close()
  await browser.close()
  return rs
}

const getDetails = async () => {
  let rs = {
    location: await getText('https://github.com/maxmckenzie', '.octicon-location + span'),
    contributions: await getText('https://github.com/maxmckenzie', '.js-yearly-contributions h2'),
    reputation: await getText('https://stackoverflow.com/users/3593217/xam?tab=badges&sort=recent', '#top-cards > aside.grid--cell.fl1.wmx4.s-card.bg-black-025.bc-black-075.c-auto.js-highlight-box-reputation > div > div > div.grid.grid__allcells6.gs8.mb16 > div:nth-child(1) > div.grid.gs8.fs-headline1 > span'),
    badges: await getText('https://stackoverflow.com/users/3593217/xam?tab=badges&sort=recent', '.user-badges .badge', 'list')
  }
  return rs
}

const getProjects = async () => {
  let rs = []
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://stackoverflow.com/story/maxmckenzie')
  const el = await page.waitForSelector('.timeline-item')
  const projectsEl = await page.$$('.timeline-item.project');

  for (let i = 0; i < projectsEl.length; i++) {
    let project = {
      title: (await projectsEl[i].$eval('.timeline-item-title', el => el.textContent, el)).trim().replace(/\s+/g, ' '),
      description: (await projectsEl[i].$eval('.timeline-item-paragraph .description-content-full', el => el.textContent, el)).trim().replace(/\s+/g, ' '),
      date: (await projectsEl[i].$eval('.timeline-item-date', el => el.textContent, el)).trim().replace(/\s+/g, ' '),
      url: (await projectsEl[i].$eval('.timeline-item-title > a', a => a.getAttribute('href'))),
    }
    rs.push(project)
  }
  await page.close()
  await browser.close()
  console.log(rs)
  return rs
}

const getSkills = async () => {
  const rs = await getText('https://stackoverflow.com/story/maxmckenzie', '.user-technologies .timeline-item-tags > .post-tag', 'list')
  return rs
};

const getEducation = async () => {
  let rs = []
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://stackoverflow.com/story/maxmckenzie')
  const el = await page.waitForSelector('.timeline-item')
  const educationEl = await page.$$('.timeline-item.education');

  for (let i = 0; i < educationEl.length; i++) {
    let project = {
      title: (await educationEl[i].$eval('.timeline-item-title', el => el.textContent, el)).trim().replace(/\s+/g, ' '),
      date: (await educationEl[i].$eval('.timeline-item-date', el => el.textContent, el)).trim().replace(/\s+/g, ' '),
    }
    rs.push(project)
  }
  await page.close()
  await browser.close()
  console.log(rs)
  return rs
}

// const getGithubCode = () => new Promise((resolve, reject) => {
//   let rs = [];
//   osmosis
//     .get('https://github.com/maxmckenzie')
//     .find('.pinned-repos-list > li')
//     .set({
//       'title': '.repo@title',
//       'url': '.pinned-repo-item-content a@href'
//     })
//     .follow('.pinned-repo-item-content a@href')
//     .set({
//       'description': '.repository-meta-content > span',
//       'tags': ['.list-topics-container > a'],
//       'numbers': ['.numbers-summary li']
//     })
//     .data(function(listing) {
//       rs.push(listing);
//     })
//     // .log(console.log)
//     .error(console.log)
//     .debug(console.log)
//     .done(function(){
//       resolve(rs);
//     });
// });
// 
const getWorkHistory = async () => {
  let rs = []
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://stackoverflow.com/story/maxmckenzie')
  const el = await page.waitForSelector('.timeline-item')
  const jobEl = await page.$$('.timeline-item.job');

  for (let i = 0; i < jobEl.length; i++) {
    let project = {
      title: (await jobEl[i].$eval('.timeline-item-title', el => el.textContent, el)).trim().replace(/\s+/g, ' '),
      tags: (await jobEl[i].$$eval('.timeline-item-tags > span', spans => spans.map((el) => el.textContent))),
      description: (await jobEl[i].$eval('.timeline-item-paragraph .description-content-full', el => el.textContent, el)).trim().replace(/\s+/g, ' '),
      date: (await jobEl[i].$eval('.timeline-item-date', el => el.textContent, el)).trim().replace(/\s+/g, ' '),
    }
    rs.push(project)
  }
  await page.close()
  await browser.close()
  return rs
}

export {
  getDetails,
  getProjects,
  getEducation,
  getSkills,
  getWorkHistory,
  // getGithubCode
};
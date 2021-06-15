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
  : rs = await page.evaluate(el => el.textContent, el)
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
  const url = 'stackoverflow.com/story/maxmckenzie'
  const projects = await getElementInnerText(url, '.timeline-item.project', 'list')
  for (let p of projects) {
    rs.push({
      title: getText(url, p),
      description: getText(url, p),
      date: getText(url, p),
      url: getText(url, p),
    })
  }

  return rs
}

// const getProjects = () => new Promise((resolve, reject) => {
//   let rs = [];
//   osmosis
//     .get('stackoverflow.com/story/maxmckenzie')
//     .find('.timeline-item.project')
//     .set({
//       'title':  '.timeline-item-title',
//       'description': '.timeline-item-paragraph .description-content-full',
//       'date': '.timeline-item-date',
//       'url': '.timeline-item-title > a@href'
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

// const getSkills = () => new Promise((resolve, reject) => {
//   let rs = [];
//   osmosis
//     .get('stackoverflow.com/story/maxmckenzie')
//     .set({
//       'skills':  ['.user-technologies .timeline-item-tags > .post-tag']
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

// const getEducation = () => new Promise((resolve, reject) => {
//   let rs = [];
//   osmosis
//     .get('stackoverflow.com/story/maxmckenzie')
//     .find('.timeline-item.education')
//     .set({
//       'title':  '.timeline-item-title',
//       'description': '.timeline-item-paragraph .description-content-full',
//       'date': '.timeline-item-date'
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

// const getWorkHistory = () => new Promise((resolve, reject) => {
//   let rs = [];
//   osmosis
//     .get('stackoverflow.com/story/maxmckenzie')
//     .find('.timeline-item.job')
//     .set({
//       'title':  '.timeline-item-title',
//       'tags': ['.timeline-item-tags > span'],
//       'description': '.timeline-item-paragraph .description-content-full',
//       'date': '.timeline-item-date'
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

export {
  getDetails,
  // getProjects,
  // getEducation,
  // getSkills,
  // getWorkHistory,
  // getGithubCode
};
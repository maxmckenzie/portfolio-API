import osmosis from 'osmosis'

const getDetails = () => new Promise((resolve, reject) => {
  let rs = []
  osmosis
    .get('https://github.com/maxmckenzie')
    .set({
      'location': '.octicon-location + span'
    })
    .get('https://stackoverflow.com/users/3593217/xam?tab=badges&sort=recent')
    .set({
      'stackoverflow': {
        'reputation': '.rep-card .rep',
        'badges': ['.user-badges .badge']
      }
    })
    .get('https://github.com/maxmckenzie')
    .set({
      'github': {
        'contributions': '.js-contribution-graph h2'
      }
    })
    .data(function(listing) {
      rs.push(listing)
    })
    .log(console.log)
    .error(reject)
    .debug(console.log)
    .done(() => {
      console.log(rs)
      resolve(rs)
    });
})

const getProjects = () => new Promise((resolve, reject) => {
  let rs = []
  osmosis
    .get('stackoverflow.com/story/maxmckenzie')
    .find('.timeline-item.project')
    .set({
      'title':  '.timeline-item-title',
      'description': '.timeline-item-paragraph .description-content-full',
      'date': '.timeline-item-date',
      'url': '.timeline-item-title > a@href'
    })
    .data(function(listing) {
      rs.push(listing)
    })
    // .log(console.log)
    .error(console.log)
    .debug(console.log)
    .done(function(){
      resolve(rs)
    })
})

const getSkills = () => new Promise((resolve, reject) => {
  let rs = []
  osmosis
    .get('stackoverflow.com/story/maxmckenzie')
    .set({
      'skills':  ['.user-technologies .timeline-item-tags > .post-tag']
    })
    .data(function(listing) {
      rs.push(listing)
    })
    // .log(console.log)
    .error(console.log)
    .debug(console.log)
    .done(function(){
      resolve(rs)
    })
})

const getEducation = () => new Promise((resolve, reject) => {
  let rs = []
  osmosis
    .get('stackoverflow.com/story/maxmckenzie')
    .find('.timeline-item.education')
    .set({
      'title':  '.timeline-item-title',
      'description': '.timeline-item-paragraph .description-content-full',
      'date': '.timeline-item-date'
    })
    .data(function(listing) {
      rs.push(listing)
    })
    // .log(console.log)
    .error(console.log)
    .debug(console.log)
    .done(function(){
      resolve(rs)
    })
})

const getGithubCode = () => new Promise((resolve, reject) => {
  let rs = []
  osmosis
    .get('https://github.com/maxmckenzie')
    .find('.pinned-repos-list > li')
    .set({
      'title': '.repo@title',
      'url': '.pinned-repo-item-content a@href'
    })
    .follow('.pinned-repo-item-content a@href')
    .set({
      'description': '.repository-meta-content > span',
      'tags': ['.list-topics-container > a'],
      'numbers': ['.numbers-summary li']
    })
    .data(function(listing) {
      rs.push(listing)
    })
    // .log(console.log)
    .error(console.log)
    .debug(console.log)
    .done(function(){
      resolve(rs)
    })
})

const getWorkHistory = () => new Promise((resolve, reject) => {
  let rs = []
  osmosis
    .get('stackoverflow.com/story/maxmckenzie')
    .find('.timeline-item.job')
    .set({
      'title':  '.timeline-item-title',
      'tags': ['.timeline-item-tags > span'],
      'description': '.timeline-item-paragraph .description-content-full',
      'date': '.timeline-item-date'
    })
    .data(function(listing) {
      rs.push(listing)
    })
    // .log(console.log)
    .error(console.log)
    .debug(console.log)
    .done(function(){
      resolve(rs)
    })
})

export {
  getDetails,
  getProjects,
  getEducation,
  getSkills,
  getWorkHistory,
  getGithubCode
}
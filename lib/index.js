import restify from 'restify'
import plugins from 'restify-plugins'
import osmosis from 'osmosis'
import request from 'request'
import fs from 'fs'
import async from 'async'

const server = restify.createServer({
  name: 'jobsbcn-scraper',
  version: '1.0.0'
});
server.use(plugins.acceptParser(server.acceptable))
server.use(plugins.queryParser())
server.use(plugins.bodyParser())
server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

const getProjects = (cb) => {
  let rs = []
  osmosis
    .get('stackoverflow.com/story/maxmckenzie')
    .find('.timeline-item.project')
    .set({
      'title':  '.timeline-item-title',
      'description': '.timeline-item-paragraph .description-content-full > p',
      'date': '.timeline-item-date',
      'url': '.timeline-item-title > a@href'
    })
    .data(function(listing) {
      rs.push(listing)
    })
    .log(console.log)
    .error(console.log)
    .debug(console.log)
    .done(function(){
      cb(rs)
    })
}

const getDetails = (cb) => {
  let rs = []
  osmosis
    .get('http://stackoverflow.com/story/maxmckenzie')
    .set({
      'location': '.meta .icon-location + span'
    })
    .follow('.meta .icon-github + a@href')
    .get('http://stackoverflow.com/users/3593217/xam?tab=badges&sort=recent')
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
    .error(console.log)
    .debug(console.log)
    .done(function(){
      cb(rs)
    })
}

const getSkills = (cb) => {
  let rs = []
  osmosis
    .get('stackoverflow.com/story/maxmckenzie')
    .set({
      'skills':  ['.user-technologies .timeline-item-tags > .post-tag']
    })
    .data(function(listing) {
      rs.push(listing)
    })
    .log(console.log)
    .error(console.log)
    .debug(console.log)
    .done(function(){
      cb(rs)
    })
}

const getEducation = (cb) => {
  let rs = []
  osmosis
    .get('stackoverflow.com/story/maxmckenzie')
    .find('.timeline-item.education')
    .set({
      'title':  '.timeline-item-title',
      'description': '.timeline-item-paragraph .description-content-full > p',
      'date': '.timeline-item-date'
    })
    .data(function(listing) {
      rs.push(listing)
    })
    .log(console.log)
    .error(console.log)
    .debug(console.log)
    .done(function(){
      cb(rs)
    })
}

const getGithubCode = (cb) => {
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
    .log(console.log)
    .error(console.log)
    .debug(console.log)
    .done(function(){
      cb(rs)
    })
}

const getWorkHistory = (cb) => {
  let rs = []
  osmosis
    .get('stackoverflow.com/story/maxmckenzie')
    .find('.timeline-item.job')
    .set({
      'title':  '.timeline-item-title',
      'tags': ['.timeline-item-tags > span'],
      'description': '.timeline-item-paragraph .description-content-full > p',
      'date': '.timeline-item-date'
    })
    .data(function(listing) {
      rs.push(listing)
    })
    .log(console.log)
    .error(console.log)
    .debug(console.log)
    .done(function(){
      cb(rs)
    })
}

server.get('/', function (req, res, next) {
  fs.readFile(process.cwd() + '/dist/data.json', 'utf8', (err, data) => {
    if (err) throw err
    console.log(JSON.parse(data))
    res.send(JSON.parse(data))
  })
  return next()
})

server.get('/scrape', function (req, res, next) {
  async.parallel({
    details: function(callback) {
      getDetails(function(rs){
        callback(false, rs)
      })
    },
    projects: function(callback) {
      getProjects(function(rs){
        callback(false, rs)
      })
    },
    code: function(callback) {
      getGithubCode(function(rs){
        callback(false, rs)
      })
    }
  }, function(err, results) {
    if (err) throw err
    console.log(results)
    fs.writeFile(process.cwd() + '/dist/data.json', JSON.stringify(results), 'utf8', (err) => {
      if (err) throw err
    }, function () {
      res.send(200)
      return next()
    })
  })
})

server.listen(process.env.PORT || 8080, function () {
  console.log('%s listening at %s', server.name, server.url)
})

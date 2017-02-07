import restify from 'restify'
import plugins from 'restify-plugins'
import osmosis from 'osmosis'
import request from 'request'

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
  const index = [
    'http://api.maxmckenzie.uk/details',
    'http://api.maxmckenzie.uk/work-history',
    'http://api.maxmckenzie.uk/open-source',
    'http://api.maxmckenzie.uk/education',
    'http://api.maxmckenzie.uk/skills'
  ]
  res.send(index)
  return next();
});

server.get('/work-history', function (req, res, next) {
  getWorkHistory(function(rs){
    res.send(rs)
  })
  return next();
});

server.get('/open-source', function (req, res, next) {
  getGithubCode(function(rs){
    res.send(rs)
  })
  return next();
})

server.get('/education', function (req, res, next) {
  getEducation(function(rs){
    res.send(rs)
  })
  return next();
})

server.get('/skills', function (req, res, next) {
  getSkills(function(rs){
    res.send(rs)
  })
  return next();
})

server.get('/details', function (req, res, next) {
  getDetails(function(rs){
    res.send(rs)
  })
  return next();
})

server.listen(process.env.PORT || 8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});

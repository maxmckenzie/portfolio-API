'use strict';

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _restifyPlugins = require('restify-plugins');

var _restifyPlugins2 = _interopRequireDefault(_restifyPlugins);

var _osmosis = require('osmosis');

var _osmosis2 = _interopRequireDefault(_osmosis);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = _restify2.default.createServer({
  name: 'scraper',
  version: '1.0.0'
});
server.use(_restifyPlugins2.default.acceptParser(server.acceptable));
server.use(_restifyPlugins2.default.queryParser());
server.use(_restifyPlugins2.default.bodyParser());
server.use(function crossOrigin(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  return next();
});

var getProjects = function getProjects(cb) {
  var rs = [];
  _osmosis2.default.get('stackoverflow.com/story/maxmckenzie').find('.timeline-item.project').set({
    'title': '.timeline-item-title',
    'description': '.timeline-item-paragraph .description-content-full',
    'date': '.timeline-item-date',
    'url': '.timeline-item-title > a@href'
  }).data(function (listing) {
    rs.push(listing);
  })
  // .log(console.log)
  .error(console.log).debug(console.log).done(function () {
    cb(rs);
  });
};

var getDetails = function getDetails(cb) {
  var rs = [];
  _osmosis2.default.get('https://github.com/maxmckenzie').set({
    'location': '.octicon-location + span'
  }).get('https://stackoverflow.com/users/3593217/xam?tab=badges&sort=recent').set({
    'stackoverflow': {
      'reputation': '.rep-card .rep',
      'badges': ['.user-badges .badge']
    }
  }).get('https://github.com/maxmckenzie').set({
    'github': {
      'contributions': '.js-contribution-graph h2'
    }
  }).data(function (listing) {
    rs.push(listing);
  }).log(console.log).error(console.log).debug(console.log).done(function () {
    cb(rs);
  });
};

var getSkills = function getSkills(cb) {
  var rs = [];
  _osmosis2.default.get('stackoverflow.com/story/maxmckenzie').set({
    'skills': ['.user-technologies .timeline-item-tags > .post-tag']
  }).data(function (listing) {
    rs.push(listing);
  })
  // .log(console.log)
  .error(console.log).debug(console.log).done(function () {
    cb(rs);
  });
};

var getEducation = function getEducation(cb) {
  var rs = [];
  _osmosis2.default.get('stackoverflow.com/story/maxmckenzie').find('.timeline-item.education').set({
    'title': '.timeline-item-title',
    'description': '.timeline-item-paragraph .description-content-full',
    'date': '.timeline-item-date'
  }).data(function (listing) {
    rs.push(listing);
  })
  // .log(console.log)
  .error(console.log).debug(console.log).done(function () {
    cb(rs);
  });
};

var getGithubCode = function getGithubCode(cb) {
  var rs = [];
  _osmosis2.default.get('https://github.com/maxmckenzie').find('.pinned-repos-list > li').set({
    'title': '.repo@title',
    'url': '.pinned-repo-item-content a@href'
  }).follow('.pinned-repo-item-content a@href').set({
    'description': '.repository-meta-content > span',
    'tags': ['.list-topics-container > a'],
    'numbers': ['.numbers-summary li']
  }).data(function (listing) {
    rs.push(listing);
  })
  // .log(console.log)
  .error(console.log).debug(console.log).done(function () {
    cb(rs);
  });
};

var getWorkHistory = function getWorkHistory(cb) {
  var rs = [];
  _osmosis2.default.get('stackoverflow.com/story/maxmckenzie').find('.timeline-item.job').set({
    'title': '.timeline-item-title',
    'tags': ['.timeline-item-tags > span'],
    'description': '.timeline-item-paragraph .description-content-full',
    'date': '.timeline-item-date'
  }).data(function (listing) {
    rs.push(listing);
  })
  // .log(console.log)
  .error(console.log).debug(console.log).done(function () {
    cb(rs);
  });
};

server.get('/', function (req, res, next) {
  _fs2.default.readFile(process.cwd() + '/dist/data.json', 'utf8', function (err, data) {
    if (err) throw err;
    console.log(JSON.parse(data));
    res.send(JSON.parse(data));
  });
  return next();
});

server.get('/scrape', function (req, res, next) {
  _async2.default.parallel({
    details: function details(callback) {
      getDetails(function (rs) {
        callback(false, rs);
      });
    },
    workhistory: function workhistory(callback) {
      getWorkHistory(function (rs) {
        callback(false, rs);
      });
    },
    projects: function projects(callback) {
      getProjects(function (rs) {
        callback(false, rs);
      });
    },
    code: function code(callback) {
      getGithubCode(function (rs) {
        callback(false, rs);
      });
    },
    education: function education(callback) {
      getEducation(function (rs) {
        callback(false, rs);
      });
    },
    skills: function skills(callback) {
      getSkills(function (rs) {
        callback(false, rs);
      });
    }
  }, function (err, results) {
    if (err) throw err;
    // console.log(results)
    _fs2.default.writeFile(process.cwd() + '/dist/data.json', JSON.stringify(results), 'utf8', function (err) {
      if (err) throw err;
    }, function () {
      res.send(200);
      return next();
    });
  });
});

server.listen(process.env.PORT || 5000, function () {
  console.log('%s listening at %s', server.name, server.url);
});
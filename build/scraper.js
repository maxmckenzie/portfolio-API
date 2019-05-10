"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGithubCode = exports.getWorkHistory = exports.getSkills = exports.getEducation = exports.getProjects = exports.getDetails = void 0;

var _osmosis = _interopRequireDefault(require("osmosis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getDetails = function getDetails() {
  return new Promise(function (resolve, reject) {
    var rs = [];

    _osmosis["default"].get('https://github.com/maxmckenzie').set({
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
    }).log(console.log).error(reject).debug(console.log).done(function () {
      console.log(rs);
      resolve(rs);
    });
  });
};

exports.getDetails = getDetails;

var getProjects = function getProjects() {
  return new Promise(function (resolve, reject) {
    var rs = [];

    _osmosis["default"].get('stackoverflow.com/story/maxmckenzie').find('.timeline-item.project').set({
      'title': '.timeline-item-title',
      'description': '.timeline-item-paragraph .description-content-full',
      'date': '.timeline-item-date',
      'url': '.timeline-item-title > a@href'
    }).data(function (listing) {
      rs.push(listing);
    }) // .log(console.log)
    .error(console.log).debug(console.log).done(function () {
      resolve(rs);
    });
  });
};

exports.getProjects = getProjects;

var getSkills = function getSkills() {
  return new Promise(function (resolve, reject) {
    var rs = [];

    _osmosis["default"].get('stackoverflow.com/story/maxmckenzie').set({
      'skills': ['.user-technologies .timeline-item-tags > .post-tag']
    }).data(function (listing) {
      rs.push(listing);
    }) // .log(console.log)
    .error(console.log).debug(console.log).done(function () {
      resolve(rs);
    });
  });
};

exports.getSkills = getSkills;

var getEducation = function getEducation() {
  return new Promise(function (resolve, reject) {
    var rs = [];

    _osmosis["default"].get('stackoverflow.com/story/maxmckenzie').find('.timeline-item.education').set({
      'title': '.timeline-item-title',
      'description': '.timeline-item-paragraph .description-content-full',
      'date': '.timeline-item-date'
    }).data(function (listing) {
      rs.push(listing);
    }) // .log(console.log)
    .error(console.log).debug(console.log).done(function () {
      resolve(rs);
    });
  });
};

exports.getEducation = getEducation;

var getGithubCode = function getGithubCode() {
  return new Promise(function (resolve, reject) {
    var rs = [];

    _osmosis["default"].get('https://github.com/maxmckenzie').find('.pinned-repos-list > li').set({
      'title': '.repo@title',
      'url': '.pinned-repo-item-content a@href'
    }).follow('.pinned-repo-item-content a@href').set({
      'description': '.repository-meta-content > span',
      'tags': ['.list-topics-container > a'],
      'numbers': ['.numbers-summary li']
    }).data(function (listing) {
      rs.push(listing);
    }) // .log(console.log)
    .error(console.log).debug(console.log).done(function () {
      resolve(rs);
    });
  });
};

exports.getGithubCode = getGithubCode;

var getWorkHistory = function getWorkHistory() {
  return new Promise(function (resolve, reject) {
    var rs = [];

    _osmosis["default"].get('stackoverflow.com/story/maxmckenzie').find('.timeline-item.job').set({
      'title': '.timeline-item-title',
      'tags': ['.timeline-item-tags > span'],
      'description': '.timeline-item-paragraph .description-content-full',
      'date': '.timeline-item-date'
    }).data(function (listing) {
      rs.push(listing);
    }) // .log(console.log)
    .error(console.log).debug(console.log).done(function () {
      resolve(rs);
    });
  });
};

exports.getWorkHistory = getWorkHistory;
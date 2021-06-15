"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWorkHistory = exports.getSkills = exports.getEducation = exports.getProjects = exports.getDetails = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var puppeteer = require('puppeteer');

var getText = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(url, selector, type) {
    var browser, page, el, rs;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('getText', {
              url: url,
              selector: selector,
              type: type
            });
            _context.next = 3;
            return puppeteer.launch();

          case 3:
            browser = _context.sent;
            _context.next = 6;
            return browser.newPage();

          case 6:
            page = _context.sent;
            _context.next = 9;
            return page["goto"](url);

          case 9:
            _context.next = 11;
            return page.waitForSelector(selector);

          case 11:
            el = _context.sent;

            if (!(type === 'list')) {
              _context.next = 18;
              break;
            }

            _context.next = 15;
            return page.evaluate(function (selector) {
              return Array.from(document.querySelectorAll(selector), function (el) {
                return el.textContent;
              });
            }, selector);

          case 15:
            rs = _context.sent;
            _context.next = 21;
            break;

          case 18:
            _context.next = 20;
            return page.evaluate(function (el) {
              return el.textContent;
            }, el);

          case 20:
            rs = _context.sent;

          case 21:
            console.log('rs', rs);
            _context.next = 24;
            return page.close();

          case 24:
            _context.next = 26;
            return browser.close();

          case 26:
            return _context.abrupt("return", rs);

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getText(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getDetails = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var rs;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getText('https://github.com/maxmckenzie', '.octicon-location + span');

          case 2:
            _context2.t0 = _context2.sent;
            _context2.next = 5;
            return getText('https://github.com/maxmckenzie', '.js-yearly-contributions h2');

          case 5:
            _context2.t1 = _context2.sent;
            _context2.next = 8;
            return getText('https://stackoverflow.com/users/3593217/xam?tab=badges&sort=recent', '#top-cards > aside.grid--cell.fl1.wmx4.s-card.bg-black-025.bc-black-075.c-auto.js-highlight-box-reputation > div > div > div.grid.grid__allcells6.gs8.mb16 > div:nth-child(1) > div.grid.gs8.fs-headline1 > span');

          case 8:
            _context2.t2 = _context2.sent;
            _context2.next = 11;
            return getText('https://stackoverflow.com/users/3593217/xam?tab=badges&sort=recent', '.user-badges .badge', 'list');

          case 11:
            _context2.t3 = _context2.sent;
            rs = {
              location: _context2.t0,
              contributions: _context2.t1,
              reputation: _context2.t2,
              badges: _context2.t3
            };
            return _context2.abrupt("return", rs);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getDetails() {
    return _ref2.apply(this, arguments);
  };
}();

exports.getDetails = getDetails;

var getProjects = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var rs, browser, page, el, projectsEl, i, project;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            rs = [];
            _context3.next = 3;
            return puppeteer.launch();

          case 3:
            browser = _context3.sent;
            _context3.next = 6;
            return browser.newPage();

          case 6:
            page = _context3.sent;
            _context3.next = 9;
            return page["goto"]('https://stackoverflow.com/story/maxmckenzie');

          case 9:
            _context3.next = 11;
            return page.waitForSelector('.timeline-item');

          case 11:
            el = _context3.sent;
            _context3.next = 14;
            return page.$$('.timeline-item.project');

          case 14:
            projectsEl = _context3.sent;
            i = 0;

          case 16:
            if (!(i < projectsEl.length)) {
              _context3.next = 34;
              break;
            }

            _context3.next = 19;
            return projectsEl[i].$eval('.timeline-item-title', function (el) {
              return el.textContent;
            }, el);

          case 19:
            _context3.t0 = _context3.sent.trim().replace(/\s+/g, ' ');
            _context3.next = 22;
            return projectsEl[i].$eval('.timeline-item-paragraph .description-content-full', function (el) {
              return el.textContent;
            }, el);

          case 22:
            _context3.t1 = _context3.sent.trim().replace(/\s+/g, ' ');
            _context3.next = 25;
            return projectsEl[i].$eval('.timeline-item-date', function (el) {
              return el.textContent;
            }, el);

          case 25:
            _context3.t2 = _context3.sent.trim().replace(/\s+/g, ' ');
            _context3.next = 28;
            return projectsEl[i].$eval('.timeline-item-title > a', function (a) {
              return a.getAttribute('href');
            });

          case 28:
            _context3.t3 = _context3.sent;
            project = {
              title: _context3.t0,
              description: _context3.t1,
              date: _context3.t2,
              url: _context3.t3
            };
            rs.push(project);

          case 31:
            i++;
            _context3.next = 16;
            break;

          case 34:
            _context3.next = 36;
            return page.close();

          case 36:
            _context3.next = 38;
            return browser.close();

          case 38:
            console.log(rs);
            return _context3.abrupt("return", rs);

          case 40:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getProjects() {
    return _ref3.apply(this, arguments);
  };
}();

exports.getProjects = getProjects;

var getSkills = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var rs;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return getText('https://stackoverflow.com/story/maxmckenzie', '.user-technologies .timeline-item-tags > .post-tag', 'list');

          case 2:
            rs = _context4.sent;
            return _context4.abrupt("return", rs);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getSkills() {
    return _ref4.apply(this, arguments);
  };
}();

exports.getSkills = getSkills;

var getEducation = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    var rs, browser, page, el, educationEl, i, project;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            rs = [];
            _context5.next = 3;
            return puppeteer.launch();

          case 3:
            browser = _context5.sent;
            _context5.next = 6;
            return browser.newPage();

          case 6:
            page = _context5.sent;
            _context5.next = 9;
            return page["goto"]('https://stackoverflow.com/story/maxmckenzie');

          case 9:
            _context5.next = 11;
            return page.waitForSelector('.timeline-item');

          case 11:
            el = _context5.sent;
            _context5.next = 14;
            return page.$$('.timeline-item.education');

          case 14:
            educationEl = _context5.sent;
            i = 0;

          case 16:
            if (!(i < educationEl.length)) {
              _context5.next = 28;
              break;
            }

            _context5.next = 19;
            return educationEl[i].$eval('.timeline-item-title', function (el) {
              return el.textContent;
            }, el);

          case 19:
            _context5.t0 = _context5.sent.trim().replace(/\s+/g, ' ');
            _context5.next = 22;
            return educationEl[i].$eval('.timeline-item-date', function (el) {
              return el.textContent;
            }, el);

          case 22:
            _context5.t1 = _context5.sent.trim().replace(/\s+/g, ' ');
            project = {
              title: _context5.t0,
              date: _context5.t1
            };
            rs.push(project);

          case 25:
            i++;
            _context5.next = 16;
            break;

          case 28:
            _context5.next = 30;
            return page.close();

          case 30:
            _context5.next = 32;
            return browser.close();

          case 32:
            console.log(rs);
            return _context5.abrupt("return", rs);

          case 34:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getEducation() {
    return _ref5.apply(this, arguments);
  };
}(); // const getGithubCode = () => new Promise((resolve, reject) => {
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


exports.getEducation = getEducation;

var getWorkHistory = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    var rs, browser, page, el, jobEl, i, project;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            rs = [];
            _context6.next = 3;
            return puppeteer.launch();

          case 3:
            browser = _context6.sent;
            _context6.next = 6;
            return browser.newPage();

          case 6:
            page = _context6.sent;
            _context6.next = 9;
            return page["goto"]('https://stackoverflow.com/story/maxmckenzie');

          case 9:
            _context6.next = 11;
            return page.waitForSelector('.timeline-item');

          case 11:
            el = _context6.sent;
            _context6.next = 14;
            return page.$$('.timeline-item.job');

          case 14:
            jobEl = _context6.sent;
            i = 0;

          case 16:
            if (!(i < jobEl.length)) {
              _context6.next = 34;
              break;
            }

            _context6.next = 19;
            return jobEl[i].$eval('.timeline-item-title', function (el) {
              return el.textContent;
            }, el);

          case 19:
            _context6.t0 = _context6.sent.trim().replace(/\s+/g, ' ');
            _context6.next = 22;
            return jobEl[i].$$eval('.timeline-item-tags > span', function (spans) {
              return spans.map(function (el) {
                return el.textContent;
              });
            });

          case 22:
            _context6.t1 = _context6.sent;
            _context6.next = 25;
            return jobEl[i].$eval('.timeline-item-paragraph .description-content-full', function (el) {
              return el.textContent;
            }, el);

          case 25:
            _context6.t2 = _context6.sent.trim().replace(/\s+/g, ' ');
            _context6.next = 28;
            return jobEl[i].$eval('.timeline-item-date', function (el) {
              return el.textContent;
            }, el);

          case 28:
            _context6.t3 = _context6.sent.trim().replace(/\s+/g, ' ');
            project = {
              title: _context6.t0,
              tags: _context6.t1,
              description: _context6.t2,
              date: _context6.t3
            };
            rs.push(project);

          case 31:
            i++;
            _context6.next = 16;
            break;

          case 34:
            _context6.next = 36;
            return page.close();

          case 36:
            _context6.next = 38;
            return browser.close();

          case 38:
            return _context6.abrupt("return", rs);

          case 39:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getWorkHistory() {
    return _ref6.apply(this, arguments);
  };
}(); // const getWorkHistory = () => new Promise((resolve, reject) => {
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


exports.getWorkHistory = getWorkHistory;
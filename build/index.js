"use strict";

var _express = _interopRequireDefault(require("express"));

var _fs = _interopRequireDefault(require("mz/fs"));

var _scraper = require("./scraper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var app = (0, _express["default"])();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  return next();
});
app.get('/', _express["default"]["static"](process.cwd() + '/dist/', {
  index: 'data.json'
}));
app.get('/scrape',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var details, projects, education, skills, workHistory, githubCode;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res.send('scraping');
            _context.next = 3;
            return (0, _scraper.getDetails)();

          case 3:
            details = _context.sent;
            _context.next = 6;
            return (0, _scraper.getProjects)();

          case 6:
            projects = _context.sent;
            _context.next = 9;
            return (0, _scraper.getEducation)();

          case 9:
            education = _context.sent;
            _context.next = 12;
            return (0, _scraper.getSkills)();

          case 12:
            skills = _context.sent;
            _context.next = 15;
            return (0, _scraper.getWorkHistory)();

          case 15:
            workHistory = _context.sent;
            _context.next = 18;
            return (0, _scraper.getGithubCode)();

          case 18:
            githubCode = _context.sent;
            console.log({
              details: details,
              projects: projects,
              education: education,
              skills: skills,
              workHistory: workHistory,
              githubCode: githubCode
            });
            _context.next = 22;
            return _fs["default"].writeFile(process.cwd() + '/dist/data.json', JSON.stringify({
              details: details,
              projects: projects,
              education: education,
              skills: skills,
              workHistory: workHistory,
              githubCode: githubCode
            }), 'utf8');

          case 22:
            res.send('<br/>complete');
            res.end();

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
app.listen(process.env.PORT || 5000, function () {
  console.log('listening at localhost:5000');
});
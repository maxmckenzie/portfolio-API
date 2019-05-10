"use strict";

var _express = _interopRequireDefault(require("express"));

var _restifyPlugins = _interopRequireDefault(require("restify-plugins"));

var _fs = _interopRequireDefault(require("mz/fs"));

var _scraper = require("./scraper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var app = (0, _express["default"])(); // app.use(plugins.acceptParser(app.acceptable));

app.use(function crossOrigin(req, res, next) {
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
            _context.next = 2;
            return (0, _scraper.getDetails)();

          case 2:
            details = _context.sent;
            _context.next = 5;
            return (0, _scraper.getProjects)();

          case 5:
            projects = _context.sent;
            _context.next = 8;
            return (0, _scraper.getEducation)();

          case 8:
            education = _context.sent;
            _context.next = 11;
            return (0, _scraper.getSkills)();

          case 11:
            skills = _context.sent;
            _context.next = 14;
            return (0, _scraper.getWorkHistory)();

          case 14:
            workHistory = _context.sent;
            _context.next = 17;
            return (0, _scraper.getGithubCode)();

          case 17:
            githubCode = _context.sent;
            console.log({
              details: details,
              projects: projects,
              education: education,
              skills: skills,
              workHistory: workHistory,
              githubCode: githubCode
            });
            _context.next = 21;
            return _fs["default"].writeFile(process.cwd() + '/dist/data.json', JSON.stringify({
              details: details,
              projects: projects,
              education: education,
              skills: skills,
              workHistory: workHistory,
              githubCode: githubCode
            }), 'utf8');

          case 21:
            res.send(200);
            res.end();

          case 23:
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
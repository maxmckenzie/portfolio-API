"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _fs = _interopRequireDefault(require("mz/fs"));

var _scraper = require("./scraper");

require('@babel/polyfill');

var app = (0, _express["default"])();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  return next();
});
app.get('/', _express["default"]["static"](process.cwd() + '/dist/', {
  index: 'data.json'
}));
app.get('/scrape', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var details, projects, education, skills, workHistory, githubCode, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
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
            githubCode = {}; //await getGithubCode();

            data = {
              details: details,
              projects: projects,
              education: education,
              skills: skills,
              workHistory: workHistory,
              githubCode: githubCode
            };
            console.log(data);
            _context.next = 20;
            return _fs["default"].writeFile(process.cwd() + '/dist/data.json', JSON.stringify(data), 'utf8');

          case 20:
            res.json(data);
            res.end();

          case 22:
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
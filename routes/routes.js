var user = require('./users');
let auth = require('./auth');
let registration = require('./registration');
let survey = require('./survey');
let question = require('./question');

module.exports.setRoutes = function(app) {
    user.setRoutes(app);
    registration.setRoutes(app);
    auth.setRoutes(app);
    survey.setRoutes(app);
    question.setRoutes(app);
};
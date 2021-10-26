const passport = require('passport');
const localStrategy = require('./strategy/local.strategy');
const jwtStrategy = require('./strategy/jwt.strategy');

passport.use(localStrategy);
passport.use(jwtStrategy);

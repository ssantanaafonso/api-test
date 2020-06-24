const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

const User = require('../models/users');

passport.use(new BasicStrategy(
    function(email, password, done) {  
      User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.comparePassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
));

// passport.serializeUser((user, done) => {
//   done(null,user.id);
// });

// passport.deserializeUser((user, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });
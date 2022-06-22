const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const passport = require('passport');
const { User } = require('../../database/index.ts');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PORT, CLIENT_URL } =
  process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${CLIENT_URL}:${PORT}/auth/google/callback`,
    }, 
    (
      accessToken: any,
      refreshToken: any,
      profile: { displayName: any, emails: [{value: string}] },
      cb: (arg0: null, arg1: any) => any
    ) => {
      User.findOrCreate({ where: { name: profile.displayName }, defaults: { email: profile.emails[0].value } })
        .then((user: any) => {
          return cb(null, user);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  )
);

passport.serializeUser((user: any, callback: any) => {
  callback(null, user);
});

// passport.deserializeUser((id: any, callback: any) => {
//   User.findById(id)
//     .then((user: any) => {
//       callback(null, user);
//     })
//     .catch(callback);
// });
passport.deserializeUser((user: any, done: any) => {
  done(null, user);
});

export {};

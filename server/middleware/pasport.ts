import { promisify } from 'util';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserSchema from 'server/models/User';
import UserService from "server/services/UserService";
import container from "server/di/container";

const userService = container.resolve<UserService>("UserService")

function toJS(resultObject, Model) {
  return resultObject.map((item) => item.get({ plain: true }));
}

passport.serializeUser((user, done) => {
  console.log('passport serialize, userId=', user.id);
  done(null, user.id);
});

passport.deserializeUser((req, id, done) => {
  console.log('passport deserialize, userId', id);
  //const toJS = di('toJS');
  userService
    .findUserInfo(id)

    .then(
      (user) => done(null, toJS(user, UserSchema)),
      (err) => done(err)
    );
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      //const toJS = di('toJS');
      userService
        .findUserWithEmailAndPassword(email, password)
        .then((user) => {
          if (user) {
            const u = toJS(user, UserSchema);
            done(null, u);
          } else {
            done(null, false, { message: 'Email or password is incorrect' });
          }
        });
    }
  )
);

export const actions = [
  promisify(passport.initialize()),
  promisify(passport.session()),
];

export const passportAuth = promisify(passport.authenticate('local'));

export default passport;
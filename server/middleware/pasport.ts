import { promisify } from "util";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserService from "server/services/UserService";
import container from "server/di/container";

function json(params: any) {
  return JSON.parse(JSON.stringify(params));
}

passport.serializeUser((user, done) => {
  console.log("passport serialize, userId=", user.id);
  done(null, user.id);
});

passport.deserializeUser((req, id, done) => {
  console.log("passport deserialize, userId", id);
  const userService = container.resolve<UserService>("UserService");
  userService.findUserInfo(id).then(
    (user) => done(null, json(user)),
    (err) => done(err)
  );
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      const userService = container.resolve<UserService>("UserService");
      userService.findUserWithEmailAndPassword(email, password).then((user) => {
        if (user) {
          const u = json(user);
          console.log("user: ", u);
          done(null, user);
        } else {
          done(null, false, { message: "Email or password is incorrect" });
        }
      });
    }
  )
);

export const actions = [
  promisify(passport.initialize()),
  promisify(passport.session()),
];

export const passportAuth = promisify(passport.authenticate("local"));

export default passport;

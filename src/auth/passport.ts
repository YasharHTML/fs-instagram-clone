import passport from "passport";
import { loginStrategy, registerStrategy } from "./strategies/local";
import { googleStrategy } from "./strategies/google";

passport.use("local.login", loginStrategy);
passport.use("local.register", registerStrategy);
passport.use(googleStrategy)

declare global {
    namespace Express {
        interface User {
            id: string;
            username: string;
            email: string;
        }
    }
}

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user as any);
    });
});

export { passport };

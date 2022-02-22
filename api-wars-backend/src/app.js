const express = require("express");
const session = require("express-session");
const passport = require("passport");
const Local = require("passport-local").Strategy;
const bcryptjs = require("bcryptjs");

const app = express();

app.use(
    session({
        resave: false,
        secret: "asdasd",
        saveUninitialized: false,
    })
);

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

const hash = (password) => {
    return bcryptjs.hash(password, 10);
};

const compare = (password, hashed) => {
    return bcryptjs.compare(password, hashed);
};

const db = {};

passport.serializeUser((user, done) => {
    done(null, user.userName);
});
passport.deserializeUser((userName, done) => {
    done(null, db[userName]);
});

passport.use(
    new Local(
        {
            passwordField: "password",
            usernameField: "userName",
        },
        (userName, password, done) => {
            if (!userName || !password) {
                return done(null, false, { message: "Wrong creds" });
            }

            const userInDb = db[userName];
            if (!userInDb) {
                return done(null, false, { message: "Wrong creds" });
            }
            compare(password, userInDb.password)
                .then((result) => {
                    if (result === true) {
                        return done(null, userInDb);
                    }
                    done(null, false, { message: "Wrong creds" });
                })
                .catch((error) => {
                    done(error, false);
                });
        }
    )
);

app.post("/register", (req, res, next) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(400).json({ message: "Missing creds" });
    }

    if (db[userName]) {
        return res.status(400).json({
            message: "Username already exists, please choose another one!",
        });
    }

    hash(password)
        .then((hashed) => {
            db[userName] = {
                userName,
                password: hashed,
            };
            res.json({ ok: true });
        })
        .catch((error) => {
            next(error);
        });
});

app.post("/signin", passport.authenticate("local"), (req, res, next) => {
    res.json(req.user);
});

app.get("/health", (req, res) => {
    //memory usage
    res.json({ ok: true, ...process.memoryUsage() });
});

// const verify = (req, res, next) => {
//     if (!req.user) {
//         return res.status(403).end();
//     }
//     next();
// };

// app.get("/profile", verify, (req, res, next) => {
//   res.json(req.user);
// });

module.exports = app;

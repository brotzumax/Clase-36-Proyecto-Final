import express from 'express';
//Passport
import passport from 'passport';
import configurePassport from '../passport-config.js';

const routerHome = express.Router();
configurePassport(passport);

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/session/login');
    }
}

routerHome.use(checkAuthentication);

//Home
routerHome.get("/", (req, res) => {
    const username = req.user.name;
    res.render('home', { username });
});

//Userinfo
routerHome.get("/info", (req, res) => {
    const user = req.user;
    res.render('userinfo', { user });
})

export default routerHome;
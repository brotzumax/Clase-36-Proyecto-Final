import express from 'express';
import bcrypt from "bcrypt";
//MongoDb
import User from "../../db/models/user.js";
//Passport
import passport from 'passport';
import configurePassport from '../passport-config.js';
//Nodemailer
import SendAdminMail from '../nodeMailer.js';
//Winston
import logger from "../loggers.js";

const routerSession = express.Router();
configurePassport(passport);

function newUserMail(newUser) {
    const sendAdminMail = new SendAdminMail();
    sendAdminMail.newRegister(newUser);
    sendAdminMail.sendMail();
}

//Registro
routerSession.get('/signup', (req, res) => {
    let inUse = false;
    return res.render('signup', { inUse });
});

routerSession.post('/signup', async (req, res) => {
    try {
        const newUser = req.body;
        const email = req.body.email;
        const alreadyUsed = await User.findOne({ email });
        if (alreadyUsed) {
            let inUse = true;
            return res.render('signup', { inUse });
        }
        const passwordHash = bcrypt.hashSync(newUser.password, 10);
        newUser.password = passwordHash;
        await new User(newUser).save();
        newUserMail(newUser);
        return res.send({ message: 'Registro exitoso' });
    } catch (error) {
        logger.error(error);
    }
})

//Inicio Sesion
routerSession.get('/login', (req, res) => {
    let failLogin = false;
    if (req.query.error) {
        failLogin = true;
    }
    res.render('login', { failLogin });
});

routerSession.post('/login', passport.authenticate('login', { failureRedirect: 'login?error=true' }), (req, res) => {
    return res.redirect('/home');
});

routerSession.get('/logout', (req, res) => {
    req.logout(() => { });
    res.redirect('login');
});

export default routerSession;
import express from 'express';
//Passport
import passport from 'passport';
import configurePassport from '../passport-config.js';
//Productos faker
import generateProducts from '../../db/fakerProducts.js';
//Nodemailer
import SendAdminMail from '../nodeMailer.js';
//Twilio
import PhoneMessagesServices from '../phoneMessages.js';

const routerHome = express.Router();
configurePassport(passport);

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/session/login');
    }
}

function newPurchase(userdata, products) {
    //Envío de Email
    const sendAdminMail = new SendAdminMail();
    sendAdminMail.newPurchase(userdata, products);
    sendAdminMail.sendMail();

    //Envío de mensajes a teléfonos
    /* const phoneMessagesServices = new PhoneMessagesServices();
    phoneMessagesServices.SendClientMessage(userdata.telephone);
    phoneMessagesServices.SendAdminWhatsapp(userdata); */
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
});

//Carrito
routerHome.get("/cart", (req, res) => {
    req.user.products = generateProducts();
    const products = req.user.products;
    req.session.cart = products; // Guarda el array de productos en la sesión
    res.render('cart', { products: products });
});

routerHome.post("/purchase", (req, res) => {
    newPurchase(req.user, req.session.cart);
    delete req.session.cart; // Borra el campo de datos "cart" de la sesión después de la compra
    res.redirect("/home");
})

export default routerHome;
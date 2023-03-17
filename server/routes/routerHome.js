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
//MongoDb
import User from "../../db/models/user.js";

const routerHome = express.Router();
configurePassport(passport);

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/session/login');
    }
}

function agregarProducto(userEmail, nuevoProducto) {
    User.findOne({ email: userEmail })
        .then(user => {
            user.cart.push(nuevoProducto);
            user.save();
        });
}

async function cargarProductos(userEmail) {
    const user = await User.findOne({ email: userEmail });
    return user.cart;
}

function limpiarCarrito(userEmail) {
    User.findOne({ email: userEmail })
        .then(user => {
            user.cart = [];
            user.save();
        });
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
    res.render('home', { username, products: generateProducts() });
});

//Userinfo
routerHome.get("/info", (req, res) => {
    const user = req.user;
    res.render('userinfo', { user });
});

//Carrito
routerHome.post("/cart", (req, res) => {
    const newProduct = req.body;
    agregarProducto(req.user.email, newProduct);
    return res.send({ ok: true });
});

routerHome.get("/cart", async (req, res) => {
    res.render('cart', { products: await cargarProductos(req.user.email) });
});

routerHome.post("/purchase", async (req, res) => {
    newPurchase(req.user, await cargarProductos(req.user.email));
    limpiarCarrito(req.user.email); // Borra el campo de datos "cart" después de la compra
    res.redirect("/home");
});

export default routerHome;
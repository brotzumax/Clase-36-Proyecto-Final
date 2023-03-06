import express from 'express';
import session from 'express-session';
//Passport
import passport from 'passport';
import configurePassport from './passport-config.js';
//Routes
import routerSession from './routes/routerSession.js';
import routerHome from './routes/routerHome.js';

const app = express();

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//Session
app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.set('views', './views');

//Rutas
app.use('/session', routerSession);
app.use('/home', routerHome);

export default app;
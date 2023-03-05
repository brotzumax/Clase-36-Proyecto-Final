import express from 'express';
import routerSession from './routes/routerSession.js'

const app = express();

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.set('views', './views');

//Rutas
app.use('/session', routerSession);

export default app;
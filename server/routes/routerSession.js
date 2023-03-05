import express from 'express';

const routerSession = express.Router();

routerSession.get('/signup', (req, res) => {
    res.render('signup');
});

routerSession.get('/login', (req, res) => {
    res.render('login');
});

export default router;
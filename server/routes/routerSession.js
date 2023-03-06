import express from 'express';
import bcrypt from "bcrypt";
//MongoDb
import User from "../../db/models/user.js";

const routerSession = express.Router();

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
        return res.send({ message: 'Registro exitoso' });
    } catch (error) {
        console.log(error);
    }
})

//Inicio Sesion
routerSession.get('/login', (req, res) => {
    res.render('login');
});

export default routerSession;
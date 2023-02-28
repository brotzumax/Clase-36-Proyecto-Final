import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Servidor funcionando");
})

app.listen(8080, () => {
    console.log('Servidor iniciado en el puerto 8080');
});
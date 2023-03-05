import app from "./server/app.js"

//Peticiones
app.get('/', (req, res) => {
    res.send("Servidor funcionando");
});

app.listen(8080, () => {
    console.log('Servidor iniciado en el puerto 8080');
});
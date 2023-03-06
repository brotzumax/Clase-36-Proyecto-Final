import app from "./server/app.js"

//Peticiones
app.get('/', (req, res) => {
    res.redirect("/session/login");
});

app.listen(8080, () => {
    console.log('Servidor iniciado en el puerto 8080');
});
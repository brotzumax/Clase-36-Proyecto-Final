import app from "./server/app.js"
//Modo CLUSTER
import minimist from 'minimist';
import cluster from 'cluster';
import os from 'os';
//Winston
import logger from "./server/loggers.js"


//Cluster
const argv = minimist(process.argv.slice(2), { alias: { m: 'modo' } });
const isClusterEnabled = argv.modo === 'CLUSTER';
const numCPUs = os.cpus().length;

//Peticiones
app.get('/', (req, res) => {
    res.redirect("/session/login");
});

//Inicio de servidor
if (isClusterEnabled) {
    if (cluster.isMaster) {
        logger.info("Servidor modo cluster");
        logger.info(`Master ${process.pid} is running`);

        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            logger.info(`Worker ${worker.process.pid} died`);
        });
    }
} else {
    app.listen(8080, () => {
        logger.info('Servidor iniciado en el puerto 8080');
    });
}

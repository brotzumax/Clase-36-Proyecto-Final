import mongoose from 'mongoose';
import 'dotenv/config';
//Winston
import logger from "../server/loggers.js";

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => logger.info('Conexión a MongoDB Atlas exitosa'))
    .catch(error => logger.error(error));

export default mongoose;
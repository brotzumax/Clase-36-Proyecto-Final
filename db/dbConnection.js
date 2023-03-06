import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión a MongoDB Atlas exitosa'))
    .catch(error => console.log(error));

export default mongoose;
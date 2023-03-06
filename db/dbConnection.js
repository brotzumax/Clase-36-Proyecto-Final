import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://admin:1234@ecommerce-backend.sfz5w6r.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión a MongoDB Atlas exitosa'))
    .catch(error => console.log(error));

export default mongoose;
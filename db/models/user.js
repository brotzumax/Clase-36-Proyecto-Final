import mongoose from '../dbConnection.js';

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    age: Number,
    telephone: Number,
    password: String,
    cart: { type: Array, default: [] }
});

const User = mongoose.model('User', userSchema);

export default User;
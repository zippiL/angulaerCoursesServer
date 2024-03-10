import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    kode: Number,
    name: String,
    address: String,
    mail: String,
    password: String
})

const userModel = mongoose.model("users", userSchema);
export default userModel;
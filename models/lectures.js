import mongoose from 'mongoose';

const lectureSchema = new mongoose.Schema({
    kode: Number,
    name: String,
    address: String,
    mail: String,
    password: String
})

const lectureModel = mongoose.model("lectures", lectureSchema);
export default lectureModel;
import mongoose from 'mongoose';

const lecturerSchema = new mongoose.Schema({
    kode: Number,
    name: String,
    address: String,
    mail: String,
    password: String
})

const lecturerModel = mongoose.model("lecturers", lecturerSchema);
export default lecturerModel;
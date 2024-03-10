import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    nameCourse: String,
    kodeKategory: String,
    amountLessons: Number,
    startCourseDate: String,
    syllabusArr: Array,
    wayLearning: Number,
    kodeLecture: String,
    image: String  
})

const courseModel = mongoose.model("courses", courseSchema);
export default courseModel;
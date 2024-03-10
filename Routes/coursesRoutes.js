import express from 'express';
import courseModel from '../models/courses.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const courses = await courseModel.find();
        res.send(courses);
    } catch (error) {
        console.error("Error retrieving courses:", error);
        res.status(500).send("Internal Server Error");
    }
});
router.get('/:id', async (req, res) => {
    const courseId = req.params.id;
    try {
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).send("Course not found");
        }
        res.send(course);
    } catch (error) {
        console.error("Error retrieving course:", error);
        res.status(500).send("Internal Server Error");
    }
});


router.post('/', async (req, res) => {
    try {
        const body = req.body;
        const newCourse = new courseModel(body);
        await newCourse.save();
        res.status(200).send("Course data added successfully!");
    } catch (error) {
        console.error("Error adding course data:", error);
        res.status(500).send("Internal Server Error");
    }
});


router.put('/:id', async (req, res) => {
    try {
        const courseId = req.params.id;
        const courseData = req.body;
        await courseModel.findByIdAndUpdate(courseId, courseData);
        res.status(200).send("Category data updated successfully!");
    } catch (error) {
        console.error("Error updating category data:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const courseId = req.params.id;
        await courseModel.findByIdAndDelete(courseId);
        res.status(200).send("Course deleted successfully!");
    } catch (error) {
        console.error("Error deleting course:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default router;

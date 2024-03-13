import express from 'express';
import lecturerModel from '../models/lecturers.js';
import userModel from '../models/users.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const lecturers = await lecturerModel.find();
        res.send(lecturers);
    } catch (error) {
        console.error("Error retrieving lecturers:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/', async (req, res) => {
    try {
        const body = req.body;
        const newLecturer = new lecturerModel(body);
        await newLecturer.save();
        res.status(200).send("Lecturer data added successfully!");
    } catch (error) {
        console.error("Error adding Lecturer data:", error);
        res.status(500).send("Internal Server Error");
    }
});
router.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await lecturerModel.findOne({ name, password });
        if (user) {
            res.status(200).json("User exists"); // Send JSON response
        } else {
            res.status(404).json({ error: "User not found" }); // Send JSON response
        }
    } catch (error) {
        console.error("Error checking user:", error);
        res.status(500).json({ error: "Internal Server Error" }); // Send JSON response
    }
});
router.post('/check', async (req, res) => {
    try {
        const { name, password } = req.body;
        const lecturer = await lecturerModel.findOne({ name, password });
        if (lecturer) {
            res.status(200).json(lecturer);
        }
        else {
            const user = await userModel.findOne({ name, password });
            console.log(user)
            // If user found, create a new lecturer based on the user's data
            if (user) {
                const newLecturer = new lecturerModel(user);
                await newLecturer.save();
                res.status(200).json(newLecturer); // Return the newly created lecturer
            } else {
                res.status(404).json({ error: "Lecturer not found" }); // Send JSON response for lecturer not found
            }
        }

    } catch (error) {
        console.error("Error checking user:", error);
        res.status(500).json({ error: "Internal Server Error" }); // Send JSON response
    }
});
router.put('/:id', async (req, res) => {
    try {
        const lecturersId = req.params.id;
        const lecturerData = req.body;
        await lecturerModel.findByIdAndUpdate(lecturersId, lecturerData);
        res.status(200).send("User data updated successfully!");
    } catch (error) {
        console.error("Error updating user data:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        await categoryModel.findByIdAndDelete(categoryId);
        res.status(200).send("Category deleted successfully!");
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).send("Internal Server Error");
    }
});
export default router;

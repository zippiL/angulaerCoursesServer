import express from 'express';
import userModel from '../models/users.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await userModel.find();
        res.send(users);
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).send("Internal Server Error");
    }
});
router.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await userModel.findOne({ name, password });
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

router.post('/', async (req, res) => {
    try {
        const body = req.body;
        const newUser = new userModel(body);
        await newUser.save();
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error adding user data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        await userModel.findByIdAndUpdate(userId, userData);
        res.status(200).send("User data updated successfully!");
    } catch (error) {
        console.error("Error updating user data:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        await userModel.findByIdAndDelete(userId);
        res.status(200).send("User deleted successfully!");
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default router;

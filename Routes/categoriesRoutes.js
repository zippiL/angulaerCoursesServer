import express from 'express';
import categoryModel from '../models/categories.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.send(categories);
    } catch (error) {
        console.error("Error retrieving categories:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/', async (req, res) => {
    try {
        const body = req.body;
        const newCategory = new categoryModel(body);
        await newCategory.save();
        res.status(200).send("Category  data added successfully!");
    } catch (error) {
        console.error("Error adding category  data:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.put('/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const categoryData = req.body;
        await categoryModel.findByIdAndUpdate(categoryId, categoryData);
        res.status(200).send("Category data updated successfully!");
    } catch (error) {
        console.error("Error updating category data:", error);
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

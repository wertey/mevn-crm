const express = require('express');
const CategoryController = require('../controllers/category-controllers');
const category_controller = new CategoryController();
const router = new express.Router();

router.get('/getCategoryList', category_controller.getCategoryList);
router.post('/newCategory', category_controller.newCategory);
router.patch('/editCategory/:oldname', category_controller.editCategory)
// router.delete('/deleteCategory', category_controller.deleteCategory);

module.exports = router;

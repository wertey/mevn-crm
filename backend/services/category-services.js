const Category = require('../models/category');

const add = async function (req) {
    console.log('req.body', req.body);
    const category = new Category(req.body);
    await category.save();
    return {Category}
};

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    limit: {
        type: Number,
    },
});

const Category = mongoose.model('Category', categorySchema)
module.exports = Category

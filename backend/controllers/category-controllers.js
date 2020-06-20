const Category = require('../models/category');
const mongoose = require('mongoose');
const CategoryList = mongoose.model('Category');
const ObjectId = require('mongodb').ObjectID;

class CategoryController {
    constructor(){}
    getCategoryList = async (req, res) => {
        CategoryList.find((err, docs) => {
            if (err) {
                res.send(err);
            } else {
                res.send(docs);
            }
        })
    };
    newCategory = async (req, res) => {
            const category = new CategoryList()
            category.name = req.body.name;
            category.limit = req.body.limit;
            category.id = req.body.id;
            category.save()
    };
    editCategory = async (req,res) => {
        CategoryList.findOneAndUpdate({name: req.body.oldname}, {$set:{limit: req.body.limit, name: req.body.name}}, {new: true}, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc);
        });
    };
    deleteItem = async (req, res) => {
        const id = req.query.id;
        const o_id = new ObjectId(id);
        CategoryList.deleteOne({ _id: o_id }, function(err, result) {
            if (err) {
                res.send('err');
            } else {
                res.send('result');
            }
        });
    };
}

module.exports = CategoryController;

const Category = require('../models/category');
const mongoose = require('mongoose');
const CategoryList = mongoose.model('Category');
const ObjectId = require('mongodb').ObjectID;

class CategoryController {
    constructor(){}
    getGoods = async (req, res) => {
        PizzaList.find((err, docs) => {
            if (err) {
                res.send(err);
            } else {
                res.send(docs);
            }
        })
    };
    newCategory = async (req, res) => {
        const category = new CategoryList()
        category.name = req.body.name,
            category.limit = req.body.limit,
            category.save()
    };
    editCategory = async (req,res) => {
            console.log('req', req.body.name);
            CategoryList.find((err, docs) => {
            console.log('docs');
            // if (err) {
            //     res.send(err);
            // } else {
            //     res.send(docs);
            // }
        })
            // const idx = CategoryList.findIndex((item) => {
            //     return item.id === parseInt(req.params.id)
            // });
            // console.log('idx', idx);
            // CONTACTS[idx] = req.body.contact;
            // res.json(CONTACTS[idx]);
    };
    deleteItem = async (req, res) => {
        const id = req.query.id;
        const o_id = new ObjectId(id);
        PizzaList.deleteOne({ _id: o_id }, function(err, result) {
            if (err) {
                res.send('err');
            } else {
                res.send('result');
            }
        });
    };
}

module.exports = CategoryController;

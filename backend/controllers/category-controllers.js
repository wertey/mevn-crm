const mongoose = require('mongoose');
const User = mongoose.model('User');
const user = require('../models/user');
const ObjectId = require('mongodb').ObjectID;

class UserController {
    constructor(){}
    getCategoryList = async (req, res) => {
        User.find((err, docs) => {
            if (err) {
                res.send(err);
            } else {
                res.send(docs);
            }
        })
    };
    newCategory = async (req, res) => {
        const id = req.body.id;
        const category = req.body.category
        User.findById((id), (err,user) => {
            if (err) {
                res.send(err)
            } else {
                user.categories.push(category)
                user.save()
                res.send(user);
            }
        })
    };
    editCategory = async (req,res) => {
        console.log('wertey')
        console.log('id', req.params.id);
        console.log('res.categoryId', req.body.categoryId)
        User.findOneAndUpdate({_id: req.params.id,
            'categories': { $elemMatch: { id: req.body.categoryId }}},
            {$set: {'categories.$.name': req.body.name, 'categories.$.limit': req.body.limit}}).exec(function (err, doc) {console.log(doc)});
        // https://stackoverflow.com/questions/38047156/update-field-of-object-in-array-of-array-with-mongoose
        // User.findOneAndUpdate(
        //     {
        //         _id: req.params.id,
        //         $set: {
        //             categories: [{
        //                 id: req.body.lockId,
        //                 admin: req.body.isAdmin
        //             }]
        //         }
        //     },
        //     { new: true },
        //     function(err, user) {
        //         if (err) {
        //             return res.status(500).send({
        //                 message: err.message || "Some error occured while updating user"
        //             });
        //         }
        //         if (!user) {
        //             return res.status(404).send({
        //                 message: "User not found"
        //             });
        //         }
        //
        //         return res.status(200).send(user);
        //     }
        // );
    };
}

module.exports = UserController;

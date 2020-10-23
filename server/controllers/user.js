//import mongoose
const mongoose = require('mongoose');

//import product model
const User = require('../models/user');


//method to add new user
exports.addNewUser = ((req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const password = req.body.password;
    const status = null;

    const user = new User({ firstName: firstName, lastName: lastName, email: email, mobile: mobile, password: password, status: status });

    user.save()
        .then(result => {
            User.find({ email: email }).then(user => {
                res.status(201);
                res.send(user);
            })
                .catch(err => console.log(err));
        })
        .catch(err => {
            console.log(err)
        });
});

//method to authenticate a user
exports.authenticateUser = (async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    await User.findOne({ email: email }).then(user => {
        if (user) {
            res.status(200);
            res.send(user);
        }
        else {
            res.status(404);
            res.send("user not registered");
        }
    })
        .catch(err => console.log(err));
});
var express = require('express'),
router = express.Router(),
User = require('../models/userSchema');

router.get('/', function(req, res){
    User.find({}, function(err, users){
        if(err){
            res.status(500).send({
                message: err,
                data: [],
            })
        }else{
            res.status(200).send({
                message: 'OK',
                data: users,
            })
        }
    });
});

router.post('/', function(req, res){
    let newUser = new User({
        name: req.body.name, 
        email: req.body.email
    })
    newUser.save(function(err, product, numAffected){
        if(err){
            res.status(500).send({
                message: err,
                data: [],
            })
        }else{
            res.status(201).send({
                message: 'OK',
                data: product,
            })
        }
    })
});

router.get('/:id', function(req, res){
    User.findById(req.params.id, (err, user) =>{
        if(err){
            res.status(500).send({
                message: err,
                data: [],
            })
        }else if(user){
            res.status(200).send({
                message: 'OK',
                data: user,
            })
        }else{
            res.status(404).send({
                message: 'Not Found',
                data: [],
            })
        }
    })
});

router.put('/:id', function(res, req){
    let updatedUser = new User({
        name: req.body.name, 
        email: req.body.email
    })
    User.findByIdAndUpdate(req.params.id, updatedUser, (err, user)=>{
        if(err){
            res.status(500).send({
                message: err,
                data: []
            })
        }else if(user){
            //not sure what data to respond with here
            res.status(201).send({
                message: 'OK',
                data: [],
            })
        }else{
            res.status(404).send({
                message: 'Not Found',
                data: [],
            })
        }
    })
});

router.delete('/:id', function(res, req){
    User.findByIdAndRemove(req.params.id, (err, user)=>{
        if(err){
            res.status(500).send({
                message: err,
                data: []
            })
        }else if(user){
            res.status(200).send({
                message: 'OK',
                data: user,
            })
        }else{
            res.status(404).send({
                message: 'Not Found',
                data: [],
            })
        }
    });
});




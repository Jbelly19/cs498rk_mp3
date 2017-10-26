let express = require('express'),
router = express.Router(),
User = require('../models/userSchema');
const querystring = require('querystring');

router.get('/', function(req, res){

        let where_obj = req.query.where;
        if(where_obj != undefined){
            where_obj = JSON.parse(where_obj);
        }

        let sort_obj = req.query.sort;
        if(sort_obj != undefined){
            sort_obj = JSON.parse(sort_obj);
        }

        let select_obj = req.query.select;
        if(select_obj != undefined){
            select_obj = JSON.parse(select_obj);
        }

        let skip_obj = req.query.skip;
        if(skip_obj != undefined){
            skip_obj = JSON.parse(skip_obj);
        }

        let limit_obj = req.query.limit;
        if(limit_obj != undefined){
            limit_obj = JSON.parse(limit_obj);
        }

        count_obj = req.query.count;

    if(count_obj){
        User.
            count(where_obj).
            limit(limit_obj).
            sort(sort_obj).
            select(select_obj).
            skip(skip_obj).
            exec(function(err, users){
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
    }else{
        User.
            find(where_obj).
            limit(limit_obj).
            sort(sort_obj).
            select(select_obj).
            skip(skip_obj).
            exec(function(err, users){
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
    }
    
});


router.post('/', function(req, res){
    //email and name validation here
    User.findOne({email: req.body.emal}, (err, user)=>{
        if(err){
            res.status(500).send({
                message: err,
                data: [],
            })
        }else if(user){
            res.status(403).send({
                message: "User with that email already exists",
                data: [],
            })
        }
    })
    let newUser = new User({
        name: req.body.name, 
        email: req.body.email,
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

router.put('/:id', function(req, res){
    //need to do email and name validation here
    if(!req.body.name || !req.body.email ){
        res.status(400).send({
            message:'Valid email and name required',
            data: [],
        })
    }
    let updatedUser = {
        name: req.body.name, 
        email: req.body.email
    };
    User.findByIdAndUpdate(req.params.id, {$set: updatedUser}, {new: true}, (err, user)=>{
        if(err){
            res.status(500).send({
                message: err,
                data: []
            })
        }else if(user){
            //send back the new user
            res.status(201).send({
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

router.delete('/:id', function(req, res){
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

module.exports = router;

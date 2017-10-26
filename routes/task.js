let express = require('express'),
router = express.Router(),
Task = require('../models/taskSchema')
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
    }else{
        limit_obj = 100;
    }

    count_obj = req.query.count;

    if(count_obj){
        Task.
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
        Task.
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
    //need to check for a name and a due date
    if(!req.body.name || !req.body.deadline){
        return res.status(400).send({
            message:'Valid name and deadline required',
            data: [],
        })
    }
    let newTask = new Task({
        name: req.body.name,
        description: req.body.description,
        deadline: req.body.deadline,
        assignedUser: req.body.assignedUser,
        assignedUserName: req.body.assignedUserName,
        completed: req.body.completed,
    })

    newTask.save(function(err, product, numAffected){
        if(err){
            return res.status(500).send({
                message: err,
                data: [],
            })
        }else{
            return res.status(201).send({
                message: "OK",
                data: product,
            })
        }
    })
});

router.get('/:id', function(req, res){
    Task.findById(req.params.id, (err, task)=>{
        if(err){
            res.status(500).send({
                message: err,
                data: [],
            })
        }else if(task){
            res.status(200).send({
                message: 'OK',
                data: task,
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
    //name and deadline validation here
    if(!req.body.name || !req.body.deadline){
        res.status(400).send({
            message:'Valid name and deadline required.',
            data: [],
        })
    }
    let updatedTask = new Task({
        name: req.body.name,
        description: req.body.description,
        deadline: req.body.deadline,
        assignedUser: req.body.assignedUser,
        assignedUserName: req.body.assignedUserName,
        completed: req.body.completed,
    })
    Task.findByIdAndUpdate(req.params.id, {$set:updatedTask}, {new: true}, (err, task)=>{
        if(err){
            res.status(500).send({
                message: err,
                data: []
            })
        }else if(task){
            res.status(200).send({
                message: 'OK',
                data: task,
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
    Task.findByIdAndRemove(req.params.id, (err, task)=>{
        if(err){
            res.status(500).send({
                message: err,
                data: []
            })
        }else if(task){
            res.status(200).send({
                message: 'OK',
                data: task,
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

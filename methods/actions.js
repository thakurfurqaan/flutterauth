var User = require('../models/user')
const jwt = require('jwt-simple')
const config = require('../config/dbconfig')

var functions = {
    addNew: function(req,res){
        if((!req.body.name) || (!req.body.password)){
            res.json({success: false, msg: 'Enter all fields'})
        } else{
            var newUser = User({
                name: req.body.name,
                password: req.body.password
            })
            newUser.save((err, newUser) =>{
                if (err){
                    console.log(err);
                    res.json({success: false, msg:'Failed to save'})
                } else{
                    res.json({success: true, msg:'Successfully Saved!'})
                }
            })
        }
    },

    authenticate: (req, res) => {
        User.findOne({ name: req.body.name }, (err, user) => {
            if(err) throw err;
            if(!user){
                res.status(403).send({success: false, msg:'Authentication Err: User Not Found!'})
            } else{
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if(isMatch && !err){
                        var token = jwt.encode(user, config.secret)
                        res.json({success: true, token: token, msg: 'Authenticated Successully'})
                    } else { 
                        console.log(err)
                        return res.status(403).send({success: false, msg: 'Authentication Failed: Wrong Password!'})
                    }
                })      
            }
        })
    },

    getinfo: function(req, res){
        if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
            var token = req.headers.authorization.split(' ')[1]
            var decodedtoken = jwt.decode(token, config.secret)
            return res.json({success: true, msg: 'Hello ' + decodedtoken.name})
        } else {
            return res.json({success: false, msg: 'No Headers'})
        }
    }
}

module.exports = functions
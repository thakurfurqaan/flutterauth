const express = require('express');
const actions = require('../methods/actions')
const router = express.Router();

router.get('/', (req,res)=>{
    res.send('Hello World')
})

router.get('/dashboard', (req,res)=>{
    res.send('Dashboard')
})

// Add User
// @desc Adding New User
// @route POST /adduser
router.post('/adduser', actions.addNew)

// Authenticate User
// @desc Authenticate User
// @route POST /authenticate
router.post('/authenticate', actions.authenticate)

// Get User Info
// @desc Get User Info
// @route GET /getinfo
router.get('/getinfo', actions.getinfo)

module.exports = router;
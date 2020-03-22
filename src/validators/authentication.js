const { check } = require('express-validator')


module.exports = [
    check('username').isEmail(),
    
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })
]
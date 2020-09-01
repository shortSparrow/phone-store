const { Router } = require("express");
// const { body, validationResult } = require('express-validator');
// const jwt = require('jsonwebtoken')
// const User = require("../models/User");
// const bcrypt = require('bcrypt');
// const config = require('config');

const router = Router();

router.post(
    '/register', // path
    (req, res) => {
        console.log('was register, POST method');
    }
)



router.post(
    '/login', //path
    (req, res) => {
        console.log('was login, POST method');
    }
)

module.exports = router
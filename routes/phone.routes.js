const { Router } = require("express");
const router = Router();
const List = require('../models/Phone');
// const User = require('../models/User')


router.get('/', async(req, res) => {
    const phoneList = await List.find({});

    res.status(200).json([...phoneList])
})

module.exports = router
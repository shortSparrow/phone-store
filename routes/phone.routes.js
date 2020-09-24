const { Router } = require("express");
const router = Router();
const List = require('../models/Phone');
// const User = require('../models/User')


router.get('/list', async(req, res) => {
    const phoneList = await List.find({});

    res.status(200).json([...phoneList])
})


router.get('/item', async(req, res) => {
    const model_name = req.param('model_name')
    
    const phoneItem = await List.findOne({routePosition: model_name});

    res.status(200).json(phoneItem)
})


module.exports = router
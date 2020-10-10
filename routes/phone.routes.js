const { Router } = require("express");
const router = Router();
const AllPhones  = require('../models/Phone');
const HotPricePhones = require('../models/Phone');

// const User = require('../models/User')


router.get('/list', async(req, res) => {
    const phoneList = await AllPhones.find({});

    res.status(200).json([...phoneList])
})

router.get('/hot-price', async(req, res) => {
    const hotPriceList = await HotPricePhones.find({});

    res.status(200).json([...hotPriceList])
})



router.get('/item', async(req, res) => {
    const model_name = req.param('model_name')
    
    const phoneItem = await AllPhones.findOne({routePosition: model_name});

    res.status(200).json(phoneItem)
})


module.exports = router
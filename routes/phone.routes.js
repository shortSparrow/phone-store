const { Router } = require("express");
const router = Router();
const Phones  = require('../models/Phone');
// const HotPricePhones = require('../models/Phone');

// const User = require('../models/User')


router.get('/list', async(req, res) => {
    const phoneList = await Phones.AllPhones.find({});

    res.status(200).json([...phoneList])
})

router.get('/hot-price', async(req, res) => {
    const hotPriceList = await Phones.HotPricePhones.find({});

    res.status(200).json([...hotPriceList])
})



router.get('/item', async(req, res) => {
    const model_name = req.param('model_name')
    
    const phoneItem = await Phones.AllPhones.findOne({routePosition: model_name});

    res.status(200).json(phoneItem)
})


module.exports = router
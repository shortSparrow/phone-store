const { Router } = require("express");
const router = Router();
const Tablets = require('../models/Tablets');
// const HotPricePhones = require('../models/Phone');

// const User = require('../models/User')


router.get('/list', async(req, res) => {
    const tabletList = await Tablets.AllTablets.find({});

    res.status(200).json([...tabletList])
})

router.get('/item', async(req, res) => {
    const model_name = req.param('model_name')
    
    const tabletItem = await Tablets.AllTablets.findOne({routePosition: model_name});

    res.status(200).json(tabletItem)
})


module.exports = router
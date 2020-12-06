const { Router } = require("express");
const router = Router();
const Accessories = require('../models/Accessories');


router.get('/list', async (req, res) => {
    const AccessoriesList = await Accessories.AllAccessories.find({})

    // console.log('Accessories: ', AccessoriesList);

    res.status(200).json([...AccessoriesList])
})

router.get('/item', async(req, res) => {
    const model_name = req.param('model_name');

    console.log('model_name: ', model_name);
    
    const phoneItem = await Accessories.AllAccessories.findOne({routePosition: model_name});

    res.status(200).json(phoneItem)
})



module.exports = router
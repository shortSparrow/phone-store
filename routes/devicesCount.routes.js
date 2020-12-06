const { Router } = require("express");
const router = Router();
const Phones  = require('../models/Phone');
const Tablets = require('../models/Tablets');
const Accessories = require('../models/Accessories');



router.get('/', async(req, res) => {
    const phonesCount = await Phones.AllPhones.countDocuments ()
    const tabletsCount = await Tablets.AllTablets.countDocuments ()
    const accessoriesCount = await Accessories.AllAccessories.countDocuments ()


    res.status(200).json({
        phones: phonesCount,
        tablets: tabletsCount,
        accessories: accessoriesCount
    })
})


module.exports = router
const { Router } = require("express");
const router = Router();
const Phones  = require('../models/Phone');
const Tablets = require('../models/Tablets');


router.get('/', async(req, res) => {
    const phonesCount = await Phones.AllPhones.count()
    const tabletsCount = await Tablets.AllTablets.count()

    res.status(200).json({
        phones: phonesCount,
        tablets: tabletsCount,
        accessories: 0
    })
})


module.exports = router
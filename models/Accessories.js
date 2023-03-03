const { Schema, model } = require("mongoose");

const accessoriesSchema = {

    routePosition: String,
    title: String,
    availabelColor: [String],
    price: {
        current: String,
        old: String,
    }
};

const AllAccessories = new Schema(accessoriesSchema, {collection: 'accessories', strict: false})

exports.AllAccessories = model('AllAccessories', AllAccessories);

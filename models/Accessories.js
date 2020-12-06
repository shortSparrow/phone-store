const { Schema, model } = require("mongoose");

const accessoriesSchema = {
    _id: String,
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

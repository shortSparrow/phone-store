const { Schema, model } = require("mongoose");

const phonePatternSchema = {
    // _id: String,
    routePosition: String,
    title: String,
    availabelColor: [String],
    availabelDevices: {
        red: {
            availableRAM: [String],
            images: {
                main: String,
                other: [String]
            },
            color: String
        },
        green: {
            availableRAM: [String],
            images: {
                main: String,
                other: [String]
            },
            color: String
        },
        black: {
            availableRAM: [String],
            images: {
                main: String,
                other: [String]
            },
            color: String
        },

    },
    price: {
        current: String,
        old: String,
    },
    deviceInfo: {
        screen: String,
        resolution: String,
        processor: String,
        camera: String,
        zoom: String,
        cell: String,
    },
    abuot: [{
        title: String,
        description: String
    }]

};

const AllPhones = new Schema(phonePatternSchema, {collection: 'lists'})
const HotPricePhones = new Schema(phonePatternSchema, {collection: 'hot_price'})


exports.AllPhones = model('AllPhones', AllPhones);
exports.HotPricePhones = model('HotPricePhones', HotPricePhones);
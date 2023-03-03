const { Schema, model } = require("mongoose");

const phonePatternSchema = {
  routePosition: String,
  title: String,
  availabelColor: [String],
  availabelDevices: {
    red: {
      availableRAM: [String],
      images: {
        main: String,
        other: [String],
      },
      color: String,
    },
    green: {
      availableRAM: [String],
      images: {
        main: String,
        other: [String],
      },
      color: String,
    },
    black: {
      availableRAM: [String],
      images: {
        main: String,
        other: [String],
      },
      color: String,
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
  about: [
    {
      title: String,
      description: String,
    },
  ],
};

const AllPhones = new Schema(phonePatternSchema, { collection: "lists" });
const HotPricePhones = new Schema(phonePatternSchema, {
  collection: "hot_price",
});
const PewPhoneModels = new Schema(phonePatternSchema, {
  collection: "new_models",
});

exports.AllPhones = model("AllPhones", AllPhones);
exports.HotPricePhones = model("HotPricePhones", HotPricePhones);
exports.PewPhoneModels = model("PewPhoneModels", PewPhoneModels);

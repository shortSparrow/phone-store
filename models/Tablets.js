const { Schema, model } = require("mongoose");

const tabletPatternSchema = {
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

const AllTablets = new Schema(tabletPatternSchema, { collection: "tablets" });
// const HotPricePhones = new Schema(tabletPatternSchema, {collection: 'hot_price'})
// const PewPhoneModels = new Schema(tabletPatternSchema, {collection: 'new_models'})

exports.AllTablets = model("AllTablets", AllTablets);
// exports.HotPricePhones = model('HotPricePhones', HotPricePhones);
// exports.PewPhoneModels = model('PewPhoneModels', PewPhoneModels);

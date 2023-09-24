const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

// Mongoose schema-model
const ingridientDBSchema = new Schema(
  {
    title: {
      type: String,
    },
    ingredientThumb: {
      type: String,
    },
    "thumb-medium": {
      type: String,
    },
    "thumb-small": {
      type: String,
    },
    abv: {
      type: String,
    },
    alcohol: {
      type: String,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
    },
    flavour: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

ingridientDBSchema.post("save", handleMongooseError);

const Ingridient = model("ingridient", ingridientDBSchema);

module.exports = { Ingridient };

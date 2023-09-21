const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const CATHEGORIES = [
  "Ordinary Drink",
  "Cocktail",
  "Shake",
  "Other/Unknown",
  "Cocoa",
  "Shot",
  "Coffee/Tea",
  "Homemade Liqueur",
  "Punch/Party Drink",
  "Beer",
  "Soft Drink",
];

const GLASSES = [
  "Highball glass",
  "Cocktail glass",
  "Old-fashioned glass",
  "Whiskey Glass",
  "Collins glass",
  "Pousse cafe glass",
  "Champagne flute",
  "Whiskey sour glass",
  "Cordial glass",
  "Brandy snifter",
  "White wine glass",
  "Nick and Nora Glass",
  "Hurricane glass",
  "Coffee mug",
  "Shot glass",
  "Jar",
  "Irish coffee cup",
  "Punch bowl",
  "Pitcher",
  "Pint glass",
  "Copper Mug",
  "Wine Glass",
  "Beer mug",
  "Margarita/Coupette glass",
  "Beer pilsner",
  "Beer Glass",
  "Parfait glass",
  "Mason jar",
  "Margarita glass",
  "Martini Glass",
  "Balloon Glass",
  "Coupe Glass",
];

// Mongoose schema-model
const drinkDBSchema = new Schema(
  {
    name: {
      type: String,
      requred: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

drinkDBSchema.post("save", handleMongooseError);

const Drink = model("contact", drinkDBSchema);

// Joi validation
const drinkSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing fields`,
  }),
  email: Joi.string().email().required().messages({
    "any.required": `missing fields`,
  }),
  favorite: Joi.boolean().messages({
    "any.required": `missing fields`,
  }),
});

const updFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field favorite`,
  }),
});

const schemas = {
  drinkSchema,
  updFavoriteSchema,
};

module.exports = { Drink, schemas };

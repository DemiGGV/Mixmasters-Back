const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

// Mongoose schema-model
const recipeDBSchema = new Schema(
  {
    drink: {
      type: String,
      requred: [true, "Set name for recipe"],
    },
    drinkAlternate: {
      type: String,
      default: "Sorry, not specified",
    },
    category: {
      type: String,
      requred: [true, "Set category for recipe"],
    },
    IBA: {
      type: String,
      default: "Sorry, not specified",
    },
    alcoholic: {
      type: String,
      requred: [true, "Specify alcoholic or non-alcoholic recipe"],
    },
    glass: {
      type: String,
      requred: [true, "Set type glass for recipe"],
    },
    description: {
      type: String,
    },
    instructions: {
      type: String,
    },
    drinkThumb: {
      type: String,
    },
    ingredients: {
      type: Schema.Types.ObjectId,
      ref: "Ingridient",
    },
    favorite: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

recipeDBSchema.post("save", handleMongooseError);

const Recipe = model("contact", recipeDBSchema);

// Joi validation
const recipeSchema = Joi.object({
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
  recipeSchema,
  updFavoriteSchema,
};

module.exports = { Recipe, schemas };

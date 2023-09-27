const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const CATEGORIES = [
  "Beer",
  "Cocktail",
  "Cocoa",
  "Coffee/Tea",
  "Homemade Liqueur",
  "Ordinary Drink",
  "Other/Unknown",
  "Punch/Party Drink",
  "Shake",
  "Shot",
  "Soft Drink",
];

const GLASSES = [
  "Balloon Glass",
  "Beer Glass",
  "Beer mug",
  "Beer pilsner",
  "Brandy snifter",
  "Champagne flute",
  "Cocktail glass",
  "Coffee mug",
  "Collins glass",
  "Copper Mug",
  "Cordial glass",
  "Coupe Glass",
  "Highball glass",
  "Hurricane glass",
  "Irish coffee cup",
  "Jar",
  "Margarita glass",
  "Margarita/Coupette glass",
  "Martini Glass",
  "Mason jar",
  "Nick and Nora Glass",
  "Old-fashioned glass",
  "Parfait glass",
  "Pint glass",
  "Pitcher",
  "Pousse cafe glass",
  "Punch bowl",
  "Shot glass",
  "Whiskey Glass",
  "Whiskey sour glass",
  "White wine glass",
  "Wine Glass",
];

const ALCOHOL = ["Alcoholic", "Non alcoholic"];

// Mongoose schema-model
const recipeDBSchema = new Schema(
  {
    drink: {
      type: String,
      unique: true,
      requred: [true, "Set name for recipe"],
    },
    drinkAlternate: {
      type: String,
      default: "Sorry, not specified",
    },
    category: {
      type: String,
      enum: CATEGORIES,
      requred: [true, "Set category for recipe"],
    },
    IBA: {
      type: String,
      default: "Sorry, not specified",
    },
    alcoholic: {
      type: String,
      enum: ALCOHOL,
      requred: [true, "Specify alcoholic or non-alcoholic recipe"],
    },
    glass: {
      type: String,
      enum: GLASSES,
      requred: [true, "Set type glass for recipe"],
    },
    description: {
      type: String,
    },
    shortDescription: {
      type: String,
    },
    instructions: {
      type: String,
    },
    drinkThumb: {
      type: String,
    },
    ingredients: [
      {
        tytle: {
          type: String,
        },
        measure: {
          type: String,
        },
        ingredientId: {
          type: Schema.Types.ObjectId,
          ref: "ingredient",
        },
      },
    ],
    favorite: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

recipeDBSchema.post("save", handleMongooseError);

const Recipe = model("recipe", recipeDBSchema);

// Joi validation
const addRecipeSchema = Joi.object({
  drink: Joi.string().empty().required().messages({
    "string.empty": `empty value not allowed`,
    "any.required": `missing required field recipe drink`,
  }),
  category: Joi.string()
    .valid(...CATEGORIES)
    .empty()
    .required()
    .messages({
      "string.empty": `empty value not allowed`,
      "any.required": `missing required field recipe category`,
      "string.only": `only exact name of categories allowed`,
    }),
  IBA: Joi.string(),
  alcoholic: Joi.string()
    .valid("Alcoholic", "Non alcoholic")
    .required()
    .messages({
      "string.only": `only exact values were allowed`,
      "any.required": `missing required field 'alcoholic' of recipes`,
    }),
  glass: Joi.string()
    .valid(...GLASSES)
    .required()
    .messages({
      "string.only": `only exact values were allowed`,
      "any.required": `missing required field 'glass' of recipes`,
    }),
  description: Joi.string().empty().required().messages({
    "string.empty": `empty value not allowed`,
    "any.required": `missing required field recipe ObjectId`,
  }),
  shortDescription: Joi.string().empty().required().messages({
    "string.empty": `empty value not allowed`,
    "any.required": `missing required field recipe ObjectId`,
  }),
  instructions: Joi.string().empty().required().messages({
    "string.empty": `empty value not allowed`,
    "any.required": `missing required field recipe ObjectId`,
  }),
  drinkThumb: Joi.string(),
  ingredients: Joi.array().items(
    Joi.object({
      tytle: Joi.string().empty().required().messages({
        "string.empty": `empty value not allowed`,
        "any.required": `missing required field ingredient tytle`,
      }),
      measure: Joi.string().empty().required().messages({
        "string.empty": `empty value not allowed`,
        "any.required": `missing required field ingredient measure`,
      }),
      ingredientId: Joi.string().empty().required().messages({
        "string.empty": `empty value not allowed`,
        "any.required": `missing required field ingredient ingredientId`,
      }),
    })
  ),
  owner: Joi.string().empty().required().messages({
    "string.empty": `empty value not allowed`,
    "any.required": `missing required field recipe ObjectId`,
  }),
});

const addDeleteIdSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": `missing required field recipe ObjectId`,
  }),
});

const countRecipesSchema = Joi.object({
  count: Joi.string().valid("1", "2", "3").required().messages({
    "any.only": `Only 1, 2 or 3 values were allowed for field 'count'`,
    "any.required": `missing required field 'count' of recipes`,
  }),
});

const searchRecipeSchema = Joi.object({
  q: Joi.string().allow(""),
  category: Joi.string()
    .allow("")
    .valid(...CATEGORIES)
    .messages({
      "any.only": `only exact name of categories allowed`,
    }),
  ingredient: Joi.string().allow(""),
  page: Joi.string().required().messages({
    "number.positive": `only positiv value allowed`,
    "any.required": `missing required field 'page'`,
  }),
  limit: Joi.string().required().messages({
    "number.positive": `only positiv value allowed`,
    "any.required": `missing required field 'limit'`,
  }),
})
  .unknown()
  .messages({
    "object.unknown": "Unknown parameters",
  });

const schemas = {
  addRecipeSchema,
  addDeleteIdSchema,
  countRecipesSchema,
  searchRecipeSchema,
};

module.exports = { Recipe, CATEGORIES, GLASSES, schemas };

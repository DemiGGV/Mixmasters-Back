const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

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
      enum: CATEGORIES,
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
      enum: GLASSES,
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

module.exports = { Recipe, CATEGORIES, GLASSES };

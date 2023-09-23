const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

// Mongoose schema-model
const ingridientDBSchema = new Schema(
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
    ingredients: [
      {
        type: Schema.Types.ObjectId,
        ref: "ingridient",
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

ingridientDBSchema.post("save", handleMongooseError);

const Ingridient = model("contact", ingridientDBSchema);

module.exports = { Ingridient };

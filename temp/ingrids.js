const cloudinary = require("cloudinary").v2;
const { Ingredient } = require("../../models/ingredient.model");
const fs = require("fs");
const path = require("path");

// шлях до папки з зображеннями
const folderPath = path.join(__dirname, "./images/ingredient");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadFileToCloudinary = async (filePath, file) => {
  try {
    // записуються файли у папку drinks зі своїм оригінальним імʼям
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "ingredients",
      public_id: file.replace(" ", "20"),
      use_filename: true,
      unique_filename: false,
    });
    console.log(`File ${filePath} uploaded to URL: ${result.url}`);
  } catch (err) {
    console.error(`Failed to upload ${filePath}. Error: ${err.message}`);
  }
};

// мені зручно робити контрольвані дії, тому я додаю тимчасову логіку зазвичай в якийсь публічний ендпоінт і за потреби активую виклик через постмен

const getIngredients = async (req, res) => {
  // всі файли з твоєї локальної папки витягуються і відправляються на завантаження в клаудинарій

  const files = fs.readdirSync(folderPath);
  for (const file of files) {
    const fullFilePath = path.join(folderPath, file);
    if (fs.statSync(fullFilePath).isFile()) {
      await uploadFileToCloudinary(fullFilePath, file);
    }
  }

  // const updateResult = await Ingredient.updateMany({}, [
  //   {
  //     $set: {
  //       ingredientThumb: {
  //         $concat: [
  //           'https://res.cloudinary.com/dzpjbw6lc/image/upload/v1695487694/ingredients/', // your base URL
  //           { $arrayElemAt: [{ $split: ['$ingredientThumb', '/'] }, -1] },
  //           '.png',
  //         ],
  //       },
  //         'thumb-medium': {
  //         $concat: [
  //           'https://res.cloudinary.com/dzpjbw6lc/image/upload/v1695487694/ingredients/', // your base URL
  //           { $arrayElemAt: [{ $split: ['$thumb-medium', '/'] }, -1] },
  //           '.png',
  //         ],
  //       },
  //           'thumb-small': {
  //         $concat: [
  //           'https://res.cloudinary.com/dzpjbw6lc/image/upload/v1695487694/ingredients/', // your base URL
  //           { $arrayElemAt: [{ $split: ['$thumb-small', '/'] }, -1] },
  //           '.png',
  //         ],
  //       },
  //     },
  //   },
  // ]);
};

module.exports = getIngredients;

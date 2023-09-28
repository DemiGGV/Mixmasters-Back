const cloudinary = require("cloudinary").v2;
const { Recipe } = require("../../models/recipe.model");
const fs = require("fs");
const path = require("path");

// шлях до папки з зображеннями
const folderPath = path.join(__dirname, "./images/drinks");

// дані для аутентифікації в клаудинарії
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadFileToCloudinary = async (filePath, file) => {
  try {
    // записуються файли у папку drinks зі своїм оригінальним імʼям
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "drinks",
      public_id: file,
      use_filename: true,
      unique_filename: false,
    });
    console.log(`File ${filePath} uploaded to URL: ${result.url}`);
  } catch (err) {
    console.error(`Failed to upload ${filePath}. Error: ${err.message}`);
  }
};

const getDrinks = async (req, res) => {
  // всі файли з твоєї локальної папки витягуються і відправляються на завантаження в клаудинарій
  const files = fs.readdirSync(folderPath);
  for (const file of files) {
    const fullFilePath = path.join(folderPath, file);
    if (fs.statSync(fullFilePath).isFile()) {
      await uploadFileToCloudinary(fullFilePath, file);
    }
  }

  // оновлюєш усі елементи колекції. Для цього слід піти в cloudinary, зайти в папку drinks і скопіювати url будь-якого зображення. Після чого частину без назви файлу слід додати в наступний код
  // const updateResult = await Drink.updateMany({}, [
  //   {
  //     $set: {
  //       drinkThumb: {
  //         $concat: [
  //           'https://res.cloudinary.com/dzpjbw6lc/image/upload/v1695485912/drinks/', // your base URL
  //           { $arrayElemAt: [{ $split: ['$drinkThumb', '/'] }, -1] },
  //           '.jpg',
  //         ],
  //       },
  //     },
  //   },
  // ]);
};

module.exports = getDrinks;

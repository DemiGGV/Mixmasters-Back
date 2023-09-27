// Формируем объект рецепта

const formData = new FormData();

const recipe = {
  drink: "",
  category: "",
  alcoholic: "",
  glass: "",
  description: "",
  shortDescription: "",
  instructions: "",
  ingredients: [
    {
      title: "",
      measure: "",
      ingredientId: "",
    },
    {
      title: "",
      measure: "",
      ingredientId: "",
    },
  ],
};

// Джейсоним его и добавляем его в FormData
formData.append("recipe", JSON.stringify(recipe));

// Файл (не урл!) изображения также добавляем в FormData
formData.append("cocktail", imageFile);

// fetch("/upload", {
//   method: "POST",
//   body: formData,
// });

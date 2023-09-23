const { Recipe, Diets } = require("../db");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
// const axios = require("axios");
// const { API_KEY } = process.env;
// const URL = "https://api.spoonacular.com/recipes/complexSearch";



const cleanData = async () => {
  // const response = await axios.get(
  //   `${URL}?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
  // );
  
    const dataFilePath = path.join(__dirname, "../data/foodComplexSearch.json");
    const data = fs.readFileSync(dataFilePath, "utf8");
    const jsonData = JSON.parse(data);
    const recipesList = jsonData.results;

  const recipesData = recipesList.map((response) => {
    const {
      id,
      title,
      image,
      healthScore,
      summary,
      analyzedInstructions,
      diets,
    } = response;

    const name = title;
    const steps = analyzedInstructions.map((elem) => elem.steps);

    return { id, name, image, healthScore, summary, steps, diets };
  });

  // console.log(recipesData);
  return recipesData;
};

const getAllRecipes = async () => {
  const dataBaseRecipes = await Recipe.findAll({
    include: {
      model: Diets,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const apiRecipes = await cleanData();

  return [...dataBaseRecipes,
     ...apiRecipes
    ];
};

const getRecipesByName = async (name) => {
  const dataBaseRecipes = await Recipe.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },

    include: {
      model: Diets,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const apiRecipes = await cleanData();

  const filteredApi = apiRecipes.filter((elem) =>
    elem.name.toLowerCase().includes(name.toLowerCase())
  );

  // console.log([...dataBaseRecipes, filteredApi]);

  return [...dataBaseRecipes, 
    ...filteredApi
  ];
};

module.exports = {
  getAllRecipes,
  getRecipesByName,
};

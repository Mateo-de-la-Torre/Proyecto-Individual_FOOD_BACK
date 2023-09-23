const {Recipe, Diets} = require('../db');
const fs = require("fs");
const path = require("path");
// const axios = require('axios');
// const { API_KEY } = process.env;
// const URL = 'https://api.spoonacular.com/recipes/complexSearch';

const getDiets = async () => {
    // const response = await axios.get(`${URL}?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
    
    const dataFilePath = path.join(__dirname, "../data/foodComplexSearch.json");
    const data = fs.readFileSync(dataFilePath, "utf8");
    const jsonData = JSON.parse(data);


    const recipesList = jsonData.results;

    const recipesData = recipesList.map(response => {
        
        const { diets } = response;
        
        // console.log(diets);
        return diets;
    }) 

    const diet = [].concat.apply([], recipesData); 

    // console.log(diet);
    // return diet;

   
    diet.forEach(el => {
        Diets.findOrCreate({
            where: { name: el } 
        })
        // console.log(el);
    });

    const allDiets = await Diets.findAll();

    // console.log(allDiets);

    return [...allDiets];
};

module.exports = {
    getDiets
}
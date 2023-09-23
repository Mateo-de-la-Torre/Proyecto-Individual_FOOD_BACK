const {Recipe, Diets} = require('../db');

const postRecipes = async (name, image, summary, healthScore, steps, diets) => {

    const newRecipes = await Recipe.create({name, image, summary, healthScore, steps});

    
    const addDiet = await Diets.findAll({
        where: {
            name: diets
        }
    })
    
    newRecipes.addDiets(addDiet); // agregar las diets a las recipes de la db
    return newRecipes
};


module.exports = {
    postRecipes
};
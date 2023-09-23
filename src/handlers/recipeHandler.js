const {postRecipes} = require('../controllers/postRecipes');
const {getAllRecipes, getRecipesByName} = require('../controllers/getAllRecipes');
const {Recipe, Diets} = require('../db');







const getRecipesHandler = async (req, res) => {
    const {name} = req.query;

    const result = name ? await getRecipesByName(name) : await getAllRecipes();

    res.status(200).send(result);
};





const getRecipesIDHandler = async (req, res) => {
    const {id} = req.params;
    const recipesTotal = await getAllRecipes();

    if(id) {
        const recipesID = recipesTotal.filter(el => el.id == id)
        recipesID.length ?
        res.status(200).json(recipesID):
        res.status(400).json("no hay receta con ese ID");
    }

};




const postRecipesHandler = async (req, res) => {
    const {name, image, summary, healthScore, steps, diets} = req.body;

    try {
        await postRecipes(name, image, summary, healthScore, steps, diets);

        res.status(200).send('La receta fue creada correctamente');
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};


const deleteRecipesHandler = async(req, res) => {
    try {
        const {id} = req.params;
        await Recipe.destroy({where: {id}})

        return res.json("Se elimino la receta");

    } catch (error) {
        return res.status(500).send("No existe una receta con ese ID");
    }
};

module.exports = {
    getRecipesHandler,
    getRecipesIDHandler,
    postRecipesHandler,
    deleteRecipesHandler
}
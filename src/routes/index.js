const { Router } = require('express');
// Importar todos los routers;

const {getRecipesHandler} = require('../handlers/recipeHandler');
const {getRecipesIDHandler} = require('../handlers/recipeHandler');
const {getDietsHandler} = require('../handlers/dietsHandler');
const {postRecipesHandler} = require('../handlers/recipeHandler');
const {deleteRecipesHandler} = require('../handlers/recipeHandler');
const {validatePost} = require('../Middlewares/validate')


const router = Router();

// Configurar los routers



router.get('/recipes', getRecipesHandler);
router.get('/recipes/:id', getRecipesIDHandler);
router.post('/recipes', validatePost, postRecipesHandler);
router.delete('/recipes/:id', deleteRecipesHandler);

router.get('/diets', getDietsHandler);


module.exports = router;

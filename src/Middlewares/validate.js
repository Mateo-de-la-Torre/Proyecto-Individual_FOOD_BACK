const {Recipe, Diets} = require('../db');


const validatePost = async (req, res, next) => {
    const {name, image, summary, healthScore, steps} = req.body;

    const exists = await Recipe.findAll({ where:{name:name}})

        if(exists.length){
            res.status(400).send("ya existe una receta con este nombre")
        }
        
        
    if (!name) return res.status(400).json({ error: "Missing name"});

    if (!image) return res.status(400).json({ error: "Missing image"});

    if (!summary) return res.status(400).json({ error: "Missing summary"});

    if (!healthScore) return res.status(400).json({ error: "Missing healthScore"});

    if (!steps) return res.status(400).json({ error: "Missing steps"}); 

    next();
}


module.exports = {
    validatePost
}
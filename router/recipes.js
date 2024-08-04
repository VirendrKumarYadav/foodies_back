const express = require("express");
const recipeControler = require("../controllers/recipes")
const router = express.Router();
const auth = require("../authentication")



router.post("/", recipeControler.createRecipe);

router.get("/recipes", recipeControler.getAllRecipes);

router.get("/", auth(["admin"]), recipeControler.getRecipesByID)

router.get("/update",recipeControler.updateRecipe);




module.exports = router;
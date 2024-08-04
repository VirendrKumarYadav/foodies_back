const recipeModal = require("../modals/recipes")
const authSchema = require("../authentication")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


const createRecipe = async (req, res) => {
    const title = req.body.title
    const image = req.body.image
    const description = req.body.description
    const price = req.body.price;
    const category = req.body.category;
    



    try {

        const newUser = new recipeModal({
            title: title,
            Image: image,
            description: description,
            price:price,
            category:category
        })
        await newUser.save();
        res.json({
            success: true,
            massage: "Racipe Created Sucessfully!",
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            massage: error.message
        });
    }

};


const updateRecipe = async (req, res) => {
  const { title, Image, description, price, category } = req.body;

  // Create an empty object to store fields to update
  let updateFields = {};

  // Dynamically add fields to updateFields if they are present in the request body
  if (title) updateFields.title = title;
  if (Image) updateFields.Image = Image;
  if (description) updateFields.description = description;
  if (price) updateFields.price = price;
  if (category) updateFields.category = category;

  try {
    const updatedRecipe = await recipeModal.findOneAndUpdate(
      {
        $or: [
          { title: title },
          { Image: Image },
          { description: description },
          { price: price },
          { category: category }
        ]
      },
      { $set: updateFields },
      {
        new: true,
        upsert: true
      }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllRecipes = async (req, res) => {
  
try{
    const recipesDetails = await recipeModal.find();
 res.json({
    recipesDetails
 })     
    } catch (error) {
        res.status(404).json({
            success: false,
            massage: "unable to find recipes ,try again!",
            stack: error.stack
        });
    }

}

const getRecipesByID = async (req, res) => {
    try {
        const userDetails = await userModal.find({
            $or: [
                {
                    username: req.body.username
                }, {
                    email: req.body.email
                }
            ]
        })
        res.json({
            success: true,
            massage: "User details",
            details: userDetails

        });
    } catch (error) {
        res.json({
            success: false,
            massage: "Unable to find the details!"
        });
    }
}



module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipesByID,
    updateRecipe
}
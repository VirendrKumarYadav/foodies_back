const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var cors = require('cors')
const userRoute = require("./router/user");
const recipeRoute =require("./router/recipes")
// const cardRoute =require("./routes/CardRouter")
const app = express();
app.use(cors())
app.options('*', cors())
//----------------------- DOT-ENV ----------------------- 
dotenv.config();


// --------------------DB Connect ------------------------------
if (process.env.SERVER=="LOCAL") {
    mongoose
      .connect(process.env.DB_LOCAL)
    .then(() => {
      console.log("LOCAL Database Connected Successully.");
    })
    .catch((err) => {
      console.log("Database Connected failed ", err);
    });
  } else {
    mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.3qnwaw3.mongodb.net/foodies`
    )
     .then(() => {
      console.log("REMOTE Database Connected Successully.");
    })
    .catch((err) => {
      console.log("Database Connected Failed ", err);
    });
  }

app.use(express.json());
app.use("/api/v1/user/",userRoute);
app.use("/api/v1/recipe/",recipeRoute);
// app.use("/api/v1/card/",cardRoute);

app.listen(process.env.PORT, () => {
  console.log("listening on "+process.env.PORT);
});
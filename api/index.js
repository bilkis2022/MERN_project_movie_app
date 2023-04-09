const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


const authRoute = require("./routes/auth");
const userroute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");

// const mdlwr = require("./verifyToken")

mongoose
  .connect(process.env.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  })
  .then(() => console.log("db connection successful"))
  .catch((err) => console.log(err));

  app.use(express.json());

  app.use("/api/auth", authRoute);
  app.use("/api/users", userroute);
  app.use("/api/movies", movieRoute);
  app.use("/api/lists", listRoute);

  // app.use(mdlwr)

app.listen(8800, () => {
  console.log("backend server is running at 8800");
});

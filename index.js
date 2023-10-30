const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
require("dotenv").config();

app.use(express.json());
app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `DB Connected Example app listening on port http://localhost:${process.env.PORT}`
    );
  } catch (err) {
    console.log(err);
  }
});

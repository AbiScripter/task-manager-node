require("dotenv").config();

const express = require("express");
const app = express();
const taskRouter = require("../routes/tasks");
const connectDB = require("../db/connect");
const notFound = require("../middleware/not-found");
const errorHandlerMiddleware = require("../middleware/error-handler");

// !Middleware
//parse json data
app.use(express.json());

app.use(express.static("./public"));

// !Routes

app.get("/", (req, res) => {
  res.send("API is working!");
});

app.use("/api/v1/tasks", taskRouter);

//!handle erros
app.use(notFound);

app.use(errorHandlerMiddleware);

// app.get("/*", (req, res) => {
//   res.status(404).send("NOT FOUND");
// });

// !Port
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("connected to DB");
    app.listen(port, console.log("server listening in port 3000"));
  } catch (err) {
    console.log(err);
  }
};

start();

// mongodb+srv://abilashb2000:<db_password>@nodeexpressprojects.tuhj8.mongodb.net/?retryWrites=true&w=majority&appName=NodeExpressProjects

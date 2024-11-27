import config from 'dotenv/config'
import express from 'express'
import sequelize from './sequelize.js'
import * as mapping from './models/mapping.js'
import cors from 'cors'
import router from './routes/user.js'
import ErrorHandler from './middleware/ErrorHandler.js'
// import cors from "cors";
// import fileUpload from "express-fileupload";
// import router from "./routers/index.js";
// import ErrorHandlingMiddlewere from "./middlewere/ErrorHandlingMiddlewere.js";
// import path from "path";
//import models from './models/models.js'

// const corsOption = {
//   origin: ["http://localhost:5173"],
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE"],
// };
// const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors())
app.use(express.json())
app.use("/", router);
app.use(ErrorHandler)

// app.get('/', (req, res) => {
//   res.status(200).send('Hello, world!')
// })



const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log("server worked in the port", PORT));
  } catch (e) {
    console.log(e);
  }
};

start();
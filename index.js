import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import MemeRoute from "./routes/MemeRoute.js";
import db from "./config/connection.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(fileUpload());
app.use(express.static("public"));
app.use(express.json());
app.use(MemeRoute);

// (async() => {
//     await db.sync()
// })();

app.listen(process.env.APP_PORT,() => {
    console.log(`server connected in port ${process.env.APP_PORT}`)
});
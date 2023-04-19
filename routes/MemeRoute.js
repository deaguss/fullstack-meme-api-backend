import { getAllMeme, saveMeme, getMemeById } from "../controller/MemeController.js";
import express from "express";

const route = express.Router();

route.get('/meme', getAllMeme);
route.get('/meme/:id', getMemeById);
route.post('/meme', saveMeme);


export default route


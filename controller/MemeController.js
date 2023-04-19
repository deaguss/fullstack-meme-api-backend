import meme from "../module/MemeModule.js";
import path from "path";
import fs from "fs";

export const getAllMeme = async(req, res) => {
    try {
        const response = await meme.findAll();
        if(!response) return res.status(404).json({msg: "data tidak ditemukan"});
        res.json(response);
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getMemeById = async(req, res) => {
    try {
        const response = await meme.findOne({
            where: {
                id: req.params.id
            }
        })
        if(!response) return res.json({msg: "meme yang anda cari tidak ditemukan"});
        res.json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const saveMeme = async(req, res) => {
    if(req.files === null) return res.status(400).json({msg: "No files uploaded"});
    const name = req.body.name;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;

    const url = `${req.protocol}://${req.get("host")}/img/${fileName}`;
    const allowType = ['.jpg', '.png','.jpeg'];

    if(!allowType.includes(ext.toLowerCase())) return res.status(420).json({msg: "tidak bisa input, coba gambar yang lain!"})
    if(fileSize > 8_000_000) return res.status(422).json({msg: "gambar tidak boleh lebih dari 8MB!"});

    file.mv(`./public/img/${fileName}`, async(err)=> {
        if(err) return res.status(500).json({msg: err.message})
    });

    try {
        await meme.create({
            image_pic: fileName,
            url: url,
            name: name
        });
        res.status(201).json({msg: "meme telah diupload!"})
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
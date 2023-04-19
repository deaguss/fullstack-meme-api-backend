import { Sequelize } from "sequelize";
import db from "../config/connection.js";

const { DataTypes } = Sequelize;

const meme = db.define('meme', {
    meme_pic: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
    },
    url: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4
    }
},
{
    freezeTableName: true
})

export default meme;
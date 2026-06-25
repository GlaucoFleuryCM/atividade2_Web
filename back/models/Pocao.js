const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Pocao = sequelize.define("Pocao", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

module.exports = Pocao;
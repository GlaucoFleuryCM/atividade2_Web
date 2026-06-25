const express = require("express");
const cors = require("cors");
const sequelize = require("./database");
const Pocao = require("./models/Pocao");

const app = express();

app.use(cors());
app.use(express.json());

// rotas
app.use("/pocoes", require("./routes/pocoes"));

// popular banco inicial com os dados da Bruna
async function iniciar() {
    await sequelize.sync({ force: true });
    const count = await Pocao.count();

    if (count == 0) {
        await Pocao.bulkCreate([
            {
                nome: "Poção Blue Sky",
                descricao: "Inspiração por 24h",
                imagem: "https://i.ibb.co/ZzS7xb2/rsz-sky.png",
                preco: 300,
            },
            {
                nome: "Poção do Perfume Misterioso",
                descricao: "Cheiro mágico por dias",
                imagem: "https://i.ibb.co/pyhZJXf/rsz-lilas.png",
                preco: 200,
            },
            {
                nome: "Poção de Pinus",
                descricao: "Cresce 10cm",
                imagem: "https://i.ibb.co/DkzdL1q/rsz-pinus.png",
                preco: 3000,
            },
            {
                nome: "Poção da Beleza Eterna",
                descricao: "Veneno que mata rápido.",
                imagem: "https://i.ibb.co/9p872NK/rsz-1beleza.png",
                preco: 100,
            },
            {
                nome: "Poção do Arco Íris",
                descricao: "Traz felicidade momentânea.",
                imagem: "https://i.ibb.co/PrC09MP/rsz-2unicornio.png",
                preco: 120,
            },
            {
                nome: "Caldeirão das Verdades Secretas",
                descricao: "Faz todos falarem a verdade por 1 hora.",
                imagem: "https://i.ibb.co/s9Lyvj8/rsz-verdades.png",
                preco: 150,
            }
        ]);
    }

    app.listen(3000, () => {
        console.log("Servidor rodando em http://localhost:3000");
    });
}

iniciar();
const express = require("express");
const router = express.Router();
const Pocao = require("../models/Pocao");

// GET todas
router.get("/", async (req, res) => {
    const pocoes = await Pocao.findAll();
    res.json(pocoes);
});

// GET por id
router.get("/:id", async (req, res) => {
    const pocao = await Pocao.findByPk(req.params.id);
    if (!pocao) return res.status(404).json({ erro: "Não encontrada" });
    res.json(pocao);
});

// POST criar
router.post("/", async (req, res) => {
    const nova = await Pocao.create(req.body);
    res.json(nova);
});

// DELETE
router.delete("/:id", async (req, res) => {
    await Pocao.destroy({ where: { id: req.params.id } });
    res.json({ ok: true });
});

module.exports = router;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../style.css";

function PaginaPocao() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pocao, setPocao] = useState(null);

    useEffect(() => {
        api.get(`/pocoes/${id}`)
            .then(res => setPocao(res.data))
            .catch(err => console.error(err));
    }, [id]);

    if (!pocao) {
        return (
            <div style={styles.loading}>
                <p>Preparando o caldeirão…</p>
            </div>
        );
    }

    return (
        <div style={styles.page}>
            {/* Back */}
            <button style={styles.backBtn} onClick={() => navigate("/home")}>
                ← Voltar à loja
            </button>

            <div style={styles.inner}>
                {/* Imagem */}
                <div style={styles.imgCol}>
                    <div style={styles.imgWrap}>
                        <img src={pocao.imagem} alt={pocao.nome} style={styles.img} />
                        <div style={styles.imgGlow} />
                    </div>
                </div>

                {/* Info */}
                <div style={styles.infoCol}>
                    <p style={styles.eyebrow}>Poção</p>
                    <h1 style={styles.nome}>{pocao.nome}</h1>
                    <p style={styles.desc}>{pocao.descricao}</p>

                    <div style={styles.precoBox}>
                        <span style={styles.precoLabel}>Valor</span>
                        <span style={styles.preco}>{pocao.preco} moedas</span>
                    </div>

                    <button style={styles.comprarBtn} onClick={() => alert("Compra não implementada")}>
                        Comprar esta poção
                    </button>

                    <p style={styles.disclaimer}>
                        * Ao comprar, você concorda que a loja Marigold não se
                        responsabiliza por efeitos colaterais inesperados.
                    </p>
                </div>
            </div>
        </div>
    );
}

const styles = {
    page: {
        background: "#0a0710",
        color: "#ede8f5",
        minHeight: "100vh",
        padding: "40px 48px",
        fontFamily: "'Gill Sans Nova', sans-serif",
    },
    loading: {
        background: "#0a0710",
        color: "#4a3a6a",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontStyle: "italic",
    },
    backBtn: {
        background: "transparent",
        border: "none",
        color: "#8878aa",
        fontFamily: "'Gill Sans Nova', sans-serif",
        fontSize: "0.82rem",
        cursor: "pointer",
        padding: "0",
        marginBottom: "48px",
        letterSpacing: "0.05em",
        display: "flex",
        alignItems: "center",
        gap: "6px",
    },
    inner: {
        display: "flex",
        gap: "72px",
        alignItems: "flex-start",
        maxWidth: "900px",
        margin: "0 auto",
    },
    imgCol: { flex: "0 0 380px" },
    imgWrap: {
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #2d1f4a",
        background: "#110d1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        boxSizing: "border-box",
    },
    img: {
        maxWidth: "100%",
        height: "420px",
        objectFit: "contain",
        display: "block",
        background: "#110d1a",
    },
    imgGlow: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "40%",
        background: "linear-gradient(to top, rgba(100,50,200,0.25), transparent)",
        pointerEvents: "none",
    },
    infoCol: { flex: 1, paddingTop: "8px" },
    eyebrow: {
        fontSize: "0.7rem",
        fontWeight: 600,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "#9b6dff",
        marginBottom: "8px",
    },
    nome: {
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "clamp(2rem, 4vw, 3rem)",
        fontWeight: 300,
        fontStyle: "italic",
        color: "#ede8f5",
        lineHeight: 1.1,
        marginBottom: "24px",
    },
    desc: {
        fontSize: "0.95rem",
        color: "#8878aa",
        lineHeight: 1.8,
        marginBottom: "36px",
    },
    precoBox: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        marginBottom: "28px",
        paddingBottom: "28px",
        borderBottom: "1px solid #2d1f4a",
    },
    precoLabel: {
        fontSize: "0.68rem",
        fontWeight: 600,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "#4a3a6a",
    },
    preco: {
        fontSize: "2rem",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontWeight: 300,
        color: "#9b6dff",
    },
    comprarBtn: {
        width: "100%",
        padding: "14px",
        background: "#9b6dff",
        border: "none",
        borderRadius: "7px",
        color: "#0a0710",
        fontFamily: "'Gill Sans Nova', sans-serif",
        fontSize: "0.82rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        cursor: "pointer",
        marginBottom: "16px",
    },
    disclaimer: {
        fontSize: "0.72rem",
        color: "#4a3a6a",
        fontStyle: "italic",
        lineHeight: 1.6,
    },
};

export default PaginaPocao;
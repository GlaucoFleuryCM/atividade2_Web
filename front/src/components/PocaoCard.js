import React from "react";
import { useNavigate } from "react-router-dom";

function PocaoCard({ pocao }) {
    const navigate = useNavigate();

    /* Formata preco: "300" -> "$ 300,00" */
    const precoFormatado = (() => {
        const n = parseFloat(pocao.preco);
        if (isNaN(n)) return `$ ${pocao.preco},00`;
        return `$ ${n.toFixed(2).replace(".", ",")}`;
    })();

    return (
        <div style={styles.card}>
            {/* Imagem */}
            <div style={styles.imgWrap}>
                <img
                    src={pocao.imagem}
                    alt={pocao.nome}
                    style={styles.img}
                    onError={e => { e.target.style.display = "none"; }}
                />
            </div>

            {/* Corpo */}
            <div style={styles.body}>
                <h3 style={styles.nome}>{pocao.nome}</h3>
                <p style={styles.preco}>{precoFormatado}</p>
                <p style={styles.desc}>{pocao.descricao}</p>
            </div>

            {/* Rodape fixo no fundo do card */}
            <div style={styles.cardFooter}>
                <button
                    style={styles.btn}
                    onClick={() => navigate(`/pocao/${pocao.id}`)}
                >
                    Adquirir
                </button>
            </div>
        </div>
    );
}

const styles = {
    card: {
        background: "#1a1228",
        border: "1px solid #2d1f4a",
        borderRadius: "6px",
        display: "flex",
        flexDirection: "column",
        /* altura uniforme garantida pelo grid com align-items: stretch */
        height: "100%",
        overflow: "hidden",
    },

    imgWrap: {
        width: "100%",
        height: "180px",
        background: "#110d1a",
        flexShrink: 0,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        boxSizing: "border-box",
    },
    img: {
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
        display: "block",
    },

    body: {
        padding: "16px 16px 0",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
    },
    nome: {
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "1.1rem",
        fontWeight: 400,
        color: "#ede8f5",
        marginBottom: "6px",
    },
    preco: {
        fontSize: "0.95rem",
        fontWeight: 600,
        color: "#9b6dff",
        letterSpacing: "0.03em",
        marginBottom: "10px",
    },
    desc: {
        fontSize: "0.8rem",
        color: "#8878aa",
        lineHeight: 1.6,
        flexGrow: 1,
        /* clamp a 4 linhas para manter uniformidade */
        display: "-webkit-box",
        WebkitLineClamp: 4,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
    },

    cardFooter: {
        padding: "14px 16px 16px",
        borderTop: "1px solid #2d1f4a",
        marginTop: "14px",
        flexShrink: 0,
    },
    btn: {
        width: "100%",
        padding: "9px 0",
        background: "transparent",
        border: "1px solid #5a3a9a",
        borderRadius: "4px",
        color: "#9b6dff",
        fontFamily: "'Gill Sans Nova', sans-serif",
        fontSize: "0.78rem",
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        cursor: "pointer",
    },
};

export default PocaoCard;
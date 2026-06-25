import { useEffect, useState } from "react";
import api from "../services/api";
import "../style.css";

const BRUXA_IMG = "/bruxinha.png"

function Admin() {
    const [pocoes, setPocoes] = useState([]);
    const [form, setForm] = useState({ nome: "", descricao: "", imagem: "", preco: "" });
    const [salvando, setSalvando] = useState(false);

    function carregarPocoes() {
        api.get("/pocoes").then(res => setPocoes(res.data));
    }

    useEffect(() => { carregarPocoes(); }, []);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function adicionar() {
        if (!form.nome.trim()) return;
        setSalvando(true);
        api.post("/pocoes", form).then(() => {
            setForm({ nome: "", descricao: "", imagem: "", preco: "" });
            carregarPocoes();
            setSalvando(false);
        });
    }

    function remover(id) {
        api.delete(`/pocoes/${id}`).then(() => carregarPocoes());
    }

    const precoFormatado = (preco) => {
        const n = parseFloat(preco);
        if (isNaN(n)) return `$ ${preco},00`;
        return `$ ${n.toFixed(2).replace(".", ",")}`;
    };

    return (
        <div style={styles.page}>

            <header style={styles.header}>
                <div>
                    <h1 style={styles.headerTitle}>Admin Page — Marigold</h1>
                    <p style={styles.headerSub}>Painel de administração da loja</p>
                </div>
                <a href="/home" style={styles.backLink}>Voltar à loja</a>
            </header>

            <hr style={styles.divider} />

            <section style={styles.section}>
                <div style={styles.container}>
                    <h2 style={styles.sectionTitle}>Adicionar Poção</h2>

                    <div style={styles.formLayout}>
                        {/* Campos do adm*/}
                        <div style={styles.formFields}>
                            <div style={styles.field}>
                                <label style={styles.label}>Nome</label>
                                <input
                                    name="nome"
                                    placeholder="Nome da pocao"
                                    value={form.nome}
                                    onChange={handleChange}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}>Descricao</label>
                                <input
                                    name="descricao"
                                    placeholder="Efeitos e detalhes"
                                    value={form.descricao}
                                    onChange={handleChange}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}>URL da imagem</label>
                                <input
                                    name="imagem"
                                    placeholder="https://..."
                                    value={form.imagem}
                                    onChange={handleChange}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}>Preco (moedas)</label>
                                <input
                                    name="preco"
                                    placeholder="Ex: 300"
                                    value={form.preco}
                                    onChange={handleChange}
                                    style={styles.input}
                                />
                            </div>
                            <button
                                style={styles.addBtn}
                                onClick={adicionar}
                                disabled={salvando}
                            >
                                {salvando ? "Adicionando..." : "Adicionar pocao"}
                            </button>
                        </div>

                        {/*Colocar minecraft Witch */}
                        <div style={styles.bruxaWrap}>
                            <img
                                src={BRUXA_IMG}
                                alt="Annabelle Marigold"
                                style={styles.bruxaImg}
                            />
                            <p style={styles.bruxaCaption}>Annabelle Marigold, ca. 1890</p>
                        </div>
                    </div>
                </div>
            </section>

            <hr style={styles.divider} />

            {/*poçÕes enfileiradas */}
            <section style={{ ...styles.section, paddingBottom: "80px" }}>
                <div style={styles.container}>
                    <h2 style={styles.sectionTitle}>
                        Pocoes cadastradas
                        <span style={styles.count}> — {pocoes.length}</span>
                    </h2>

                    {pocoes.length === 0 ? (
                        <p style={styles.empty}>Nenhuma pocao cadastrada ainda.</p>
                    ) : (
                        <div style={styles.grid}>
                            {pocoes.map(p => (
                                <div key={p.id} style={styles.card}>
                                    <div style={styles.imgWrap}>
                                        <img
                                            src={p.imagem}
                                            alt={p.nome}
                                            style={styles.img}
                                            onError={e => { e.target.style.display = "none"; }}
                                        />
                                    </div>

                                    <div style={styles.cardBody}>
                                        <h3 style={styles.cardNome}>{p.nome}</h3>
                                        <p style={styles.cardPreco}>{precoFormatado(p.preco)}</p>
                                        <p style={styles.cardDesc}>{p.descricao}</p>
                                    </div>
                                    <div style={styles.cardFooter}>
                                        <button
                                            style={styles.deleteBtn}
                                            onClick={() => remover(p.id)}
                                        >
                                            Remover
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

        </div>
    );
}

const styles = {
    page: {
        background: "#0a0710",
        minHeight: "100vh",
        color: "#ede8f5",
        fontFamily: "'Gill Sans Nova', 'Gill Sans', 'Trebuchet MS', sans-serif",
    },
    container: {
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "0 48px",
    },

    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "56px 48px 48px",
        maxWidth: "1100px",
        margin: "0 auto",
    },
    headerTitle: {
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
        fontWeight: 300,
        color: "#ede8f5",
        letterSpacing: "0.03em",
        marginBottom: "6px",
    },
    headerSub: {
        fontSize: "0.88rem",
        color: "#8878aa",
        fontWeight: 300,
        letterSpacing: "0.05em",
    },
    backLink: {
        fontSize: "0.78rem",
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "#8878aa",
        textDecoration: "none",
        border: "1px solid #2d1f4a",
        padding: "9px 18px",
        borderRadius: "4px",
        whiteSpace: "nowrap",
    },

    divider: {
        border: "none",
        borderTop: "1px solid #2d1f4a",
        margin: "0",
    },

    section: { padding: "56px 0 0" },

    sectionTitle: {
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
        fontWeight: 300,
        color: "#ede8f5",
        marginBottom: "32px",
        letterSpacing: "0.02em",
    },
    count: {
        color: "#4a3a6a",
        fontSize: "1.2rem",
    },

    formLayout: {
        display: "flex",
        gap: "56px",
        alignItems: "flex-start",
    },
    formFields: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    },
    field: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
    },
    label: {
        fontSize: "0.7rem",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "#8878aa",
    },
    input: {
        padding: "11px 14px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid #2d1f4a",
        borderRadius: "6px",
        color: "#ede8f5",
        fontFamily: "'Gill Sans Nova', sans-serif",
        fontSize: "0.9rem",
        outline: "none",
    },
    addBtn: {
        marginTop: "8px",
        padding: "12px 24px",
        background: "#9b6dff",
        border: "none",
        borderRadius: "6px",
        color: "#0a0710",
        fontFamily: "'Gill Sans Nova', sans-serif",
        fontSize: "0.78rem",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        cursor: "pointer",
        alignSelf: "flex-start",
    },

    bruxaWrap: {
        flex: "0 0 300px",
    },
    bruxaImg: {
        width: "100%",
        height: "280px",
        objectFit: "contain",
        display: "block",
        border: "1px solid #2d1f4a",
        borderRadius: "4px",
        background: "#110d1a",
        padding: "12px",
        boxSizing: "border-box",
        filter: "sepia(20%) brightness(0.85)",
    },
    bruxaCaption: {
        fontSize: "0.72rem",
        color: "#4a3a6a",
        fontStyle: "italic",
        textAlign: "center",
        marginTop: "8px",
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "24px",
        alignItems: "stretch",
    },
    card: {
        background: "#1a1228",
        border: "1px solid #2d1f4a",
        borderRadius: "6px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
    },
    imgWrap: {
        width: "100%",
        height: "180px",
        background: "#110d1a",
        flexShrink: 0,
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
    cardBody: {
        padding: "16px 16px 0",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
    },
    cardNome: {
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "1.1rem",
        fontWeight: 400,
        color: "#ede8f5",
        marginBottom: "6px",
    },
    cardPreco: {
        fontSize: "0.95rem",
        fontWeight: 600,
        color: "#9b6dff",
        letterSpacing: "0.03em",
        marginBottom: "10px",
    },
    cardDesc: {
        fontSize: "0.8rem",
        color: "#8878aa",
        lineHeight: 1.6,
        flexGrow: 1,
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
    deleteBtn: {
        width: "100%",
        padding: "9px 0",
        background: "transparent",
        border: "1px solid #7a2830",
        borderRadius: "4px",
        color: "#c0243e",
        fontFamily: "'Gill Sans Nova', sans-serif",
        fontSize: "0.78rem",
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        cursor: "pointer",
    },

    empty: {
        color: "#4a3a6a",
        fontStyle: "italic",
        padding: "40px 0",
    },
};

export default Admin;
import React, { useEffect, useState } from "react";
import api from "../services/api";
import PocaoCard from "../components/PocaoCard";
import "../style.css";

const HISTORIA_IMG = "/witch_house.png"

function Home() {
    const [pocoes, setPocoes] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        api.get("/pocoes")
            .then(res => { setPocoes(res.data); setCarregando(false); })
            .catch(() => { alert("Erro ao carregar pocoes"); setCarregando(false); });
    }, []);

    return (
        <div style={styles.page}>

            {/*cabecalho */}
            <header style={styles.header}>
                <h1 style={styles.headerTitle}>Marigold's Potions for Wizards</h1>
                <p style={styles.headerSub}>since 1867 in Saint Charles, SP</p>
            </header>

            <hr style={styles.divider} />

            {/*lore */}
            <section style={styles.section}>
                <div style={styles.container}>
                    <h2 style={styles.sectionTitle}>Nossa História</h2>
                    <div style={styles.historiaLayout}>
                        <div style={styles.historiaTextos}>
                            <p style={styles.p}>
                                Fundada em 1867 por Annabelle Marigold, a loja tem suas raízes
                                nos porões do que viria a ser o IFSC. Os frascos são preparados
                                através de magia arcana, combinando mana e sombras malignas.
                            </p>
                            <p style={styles.p}>
                                Após mais de um seculo e meio de tradição, seguimos entregando
                                poções da melhor qualidade — dignas de surpreender o grande mago
                                Sauron, e toda Mordor.
                            </p>
                            <p style={styles.p}>
                                Atendemos clientes de todas as especies: bruxos, feiticeiros, magos
                                iniciantes e ate os mais céticos dos trouxas. Nosso objetivo reside em
                                trazer a magia para todos, não importam as consequências disso.
                            </p>
                            <p style={styles.p}>
                                Há garantia de satisfação; do contrário, devolvemos seu ouro. Visite-nos
                                no Beco da Última Saída e descubra o que a alquimia artesanal pode
                                fazer por você.
                            </p>
                        </div>
                        <div style={styles.historiaImgWrap}>
                            <img
                                src={HISTORIA_IMG}
                                alt="Interior da loja no seculo XIX"
                                style={styles.historiaImg}
                            />
                            <p style={styles.historiaCaption}>Exterior da loja, sec. XIX</p>
                        </div>
                    </div>
                </div>
            </section>

            <hr style={styles.divider} />

            <section style={styles.section} id="pocoes">
                <div style={styles.container}>
                    <h2 style={styles.sectionTitle}>Poções Disponíveis</h2>

                    {carregando ? (
                        <p style={styles.loading}>Carregando pocoes...</p>
                    ) : pocoes.length === 0 ? (
                        <p style={styles.loading}>Nenhuma pocao encontrada.</p>
                    ) : (
                        <div style={styles.grid}>
                            {pocoes.map(p => <PocaoCard key={p.id} pocao={p} />)}
                        </div>
                    )}
                </div>
            </section>

            <hr style={styles.divider} />

            {/* ── Contato / Footer ─────────────────────────── */}
            <footer style={styles.footer}>
                <div style={styles.container}>
                    <h2 style={styles.sectionTitle}>Contato</h2>
                    <p style={styles.p}>Email: annabelle@pocoes.com</p>
                    <p style={styles.p}>Endereco: Beco da Ultima Saida, Sao Carlos — SP</p>
                    <p style={styles.p}>Horario: Aberto entre 3h e 5h</p>
                    <p style={{ ...styles.p, marginTop: "32px", color: "#4a3a6a", fontSize: "0.78rem" }}>
                        1867–{new Date().getFullYear()} Pocoes e Solucoes — Todos os encantamentos reservados
                    </p>
                </div>
            </footer>

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

    /* Header */
    header: {
        textAlign: "center",
        padding: "80px 32px 64px",
        position: "relative",
        overflow: "hidden",
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(100,50,200,0.22) 0%, transparent 70%)",
    },
    headerTitle: {
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "clamp(2rem, 4vw, 3.2rem)",
        fontWeight: 300,
        color: "#ede8f5",
        letterSpacing: "0.04em",
        marginBottom: "12px",
    },
    headerSub: {
        fontFamily: "'Gill Sans Nova', sans-serif",
        fontSize: "1rem",
        fontWeight: 300,
        color: "#8878aa",
        letterSpacing: "0.08em",
    },

    divider: {
        border: "none",
        borderTop: "1px solid #2d1f4a",
        margin: "0",
    },

    /* Sections */
    section: {
        padding: "64px 0",
    },
    sectionTitle: {
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
        fontWeight: 300,
        color: "#ede8f5",
        marginBottom: "36px",
        letterSpacing: "0.02em",
    },
    p: {
        fontSize: "0.93rem",
        color: "#8878aa",
        lineHeight: 1.8,
        marginBottom: "14px",
        fontWeight: 300,
    },

    /* Historia */
    historiaLayout: {
        display: "flex",
        gap: "56px",
        alignItems: "flex-start",
    },
    historiaTextos: {
        flex: 1,
    },
    historiaImgWrap: {
        flex: "0 0 340px",
    },
    historiaImg: {
        width: "100%",
        height: "300px",
        objectFit: "cover",
        display: "block",
        border: "1px solid #2d1f4a",
        borderRadius: "4px",
        filter: "sepia(25%) brightness(0.82)",
    },
    historiaCaption: {
        fontSize: "0.72rem",
        color: "#4a3a6a",
        fontStyle: "italic",
        marginTop: "8px",
        textAlign: "center",
    },

    /* Grid de pocoes */
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "24px",
        alignItems: "stretch",
    },

    loading: {
        color: "#4a3a6a",
        fontStyle: "italic",
        padding: "40px 0",
    },

    /* Footer */
    footer: {
        padding: "64px 0 56px",
        background: "#110d1a",
        borderTop: "1px solid #2d1f4a",
    },
};

export default Home;
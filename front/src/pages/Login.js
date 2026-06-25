import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

function Login() {
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    function handleLogin() {
        if (nome === "Marigold" && senha === "123") {
            navigate("/admin");
        } else {
            navigate("/home");
        }
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") handleLogin();
    }

    return (
        <div style={styles.page}>
            {/* Decorative vertical line */}
            <div style={styles.line} />

            <div style={styles.wrapper}>
                {/* Emblem */}
                <div style={styles.emblem}>
                    <span style={styles.emblemIcon}>✦</span>
                </div>

                <h2 style={styles.brandTitle}>Poções & Soluções</h2>
                <h1 style={styles.title}>Beco da Última Saída</h1>
                <p style={styles.subtitle}>
                    Fundada em 1867 · Annabelle Marigold
                </p>

                <hr style={styles.rule} />

                <div style={styles.form}>
                    <label style={styles.label}>Nome</label>
                    <input
                        style={styles.input}
                        placeholder="Seu nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />

                    <label style={styles.label}>Senha</label>
                    <input
                        style={styles.input}
                        type="password"
                        placeholder="••••••"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />

                    <button style={styles.btn} onClick={handleLogin}>
                        Entrar na loja
                    </button>
                </div>

            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse at 60% 40%, #1a1220 0%, #0a0710 70%)",
        padding: "32px",
        position: "relative",
        overflow: "hidden",
    },
    line: {
        position: "absolute",
        left: "50%",
        top: 0,
        width: "1px",
        height: "100%",
        background: "linear-gradient(to bottom, transparent, #2d1f4a 30%, #2d1f4a 70%, transparent)",
        opacity: 0.4,
    },
    wrapper: {
        position: "relative",
        zIndex: 1,
        background: "#110d1a",
        border: "1px solid #2d1f4a",
        borderRadius: "12px",
        padding: "56px 48px",
        width: "100%",
        maxWidth: "420px",
        textAlign: "center",
        boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
    },
    emblem: {
        width: "64px",
        height: "64px",
        border: "1px solid #9b6dff44",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 24px",
        fontSize: "28px",
        background: "rgba(155,109,255,0.06)",
    },
    emblemIcon: { lineHeight: 1, color: "#9b6dff" },
    brandTitle: {
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "2rem",
        fontWeight: 300,
        letterSpacing: "0.04em",
        color: "#ede8f5",
        marginBottom: "8px",
        textShadow: "0 0 40px rgba(155,109,255,0.3)",
    },
    eyebrow: {
        fontSize: "0.7rem",
        fontWeight: 600,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "#9b6dff",
        marginBottom: "8px",
    },
    title: {
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "1.8rem",
        fontWeight: 300,
        color: "#ede8f5",
        marginBottom: "8px",
    },
    subtitle: {
        fontSize: "0.82rem",
        color: "#8878aa",
        letterSpacing: "0.05em",
    },
    rule: {
        border: "none",
        borderTop: "1px solid #2d1f4a",
        margin: "28px 0",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        textAlign: "left",
    },
    label: {
        fontSize: "0.72rem",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "#8878aa",
        marginBottom: "4px",
    },
    input: {
        width: "100%",
        padding: "11px 14px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid #2d1f4a",
        borderRadius: "6px",
        color: "#ede8f5",
        fontFamily: "'Gill Sans Nova', sans-serif",
        fontSize: "0.95rem",
        outline: "none",
        marginBottom: "4px",
    },
    btn: {
        marginTop: "8px",
        padding: "13px",
        background: "#9b6dff",
        border: "none",
        borderRadius: "6px",
        color: "#0a0710",
        fontFamily: "'Gill Sans Nova', sans-serif",
        fontSize: "0.78rem",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        cursor: "pointer",
    },
    hint: {
        marginTop: "24px",
        fontSize: "0.72rem",
        color: "#4a3a6a",
        lineHeight: 1.7,
    },
};

export default Login;
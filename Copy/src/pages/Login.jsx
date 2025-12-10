import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config.js";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const loginStaff = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/staffpage")
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={styles.wrapper}>
            <form className={styles.card} onSubmit={loginStaff}>
                <h2 className={styles.title}>Teacher Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && <p className={styles.error}>{error}</p>}

                <button className={styles.btn}>Login</button>
            </form>
        </div>
    );
}

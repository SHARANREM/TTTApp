import { useState, useEffect } from "react";
import nameBlack from "../assets/NameBlack.png";
import Drop from "../Components/Drop";
import styles from "./Home.module.scss";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => setLoading(false), 1700);
    }, []);

    // Navigation handlers
    const goStudent = () => navigate("/studpage");
    const goStaff = () => navigate("/login");

    return (
        <>
            {/* Preloader */}
            {loading && (
                <Drop
                    path={1}
                    content={nameBlack}
                    theme="dark"
                />
            )}

            {/* Main UI */}
            {!loading && (
                <div className={styles.container}>
                    <div className={styles.card}>
                        <img src={nameBlack} className={styles.logo} />

                        <h2 className={styles.title}>Who are you?</h2>

                        <div className={styles.btnGroup}>
                            <button className={styles.studentBtn} onClick={goStudent}>
                                I am a Student
                            </button>

                            <button className={styles.staffBtn} onClick={goStaff}>
                                I am a Staff / HOD
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

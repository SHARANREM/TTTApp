import React from "react";
import styles from "./Loader.module.scss";

export default function Drop({ path = 1, content, theme="light" }) {
  const aniPath = path === 2 ? styles.dropBack : styles.drop;

  return (
    <div className={`${styles.preloaderDrop} ${styles[theme]}`} style={{
      ...(theme==="light"&&{background:"#1c1c1c"}),
      ...(theme==="dark"&&{background:"#fff"}),
    }}>
      {content && 
        <div className={styles.DContent}>
          <img src={content}/>
        </div>}
      <div className={aniPath} style={{
        ...(theme==="light"&&{background:"#fff"}),
        ...(theme==="dark"&&{background:"#1c1c1c"}),
      }}></div>
    </div>
  );
}

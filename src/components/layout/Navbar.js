import React from "react";
import styles from "./navbarStyles.module.scss";

export default function Navbar() {
  return (
    <nav className={`${styles.navbar} nav`}>
      <div className={styles.branding}>
        <h1>Awesome Movie Search</h1>
        <p>Fast search for any movie, tv show, or etc</p>
      </div>
    </nav>
  );
}

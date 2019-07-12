import React from "react";
import styles from "./spinnerStyles.module.scss";

export default function Spinner() {
  return <div className={styles.spinner} alt="Loading..." />;
}

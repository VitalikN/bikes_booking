import styles from "../sass/layouts/loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.ball}></div>
        <div className={styles.ball}></div>
        <div className={styles.ball}></div>
        <div className={styles.shadow}></div>
        <div className={styles.shadow}></div>
        <div className={styles.shadow}></div>
      </div>
    </div>
  );
};
export default Loader;

import styles from "../sass/layouts/signIn.module.scss";

const Linkedin = () => {
  const handleLinkedin = () => {
    console.log("clik");
  };

  return (
    <div className={styles.box__linkedin}>
      <p className={styles.text__register}>Увійти за допомогою</p>
      <svg
        className={styles.linkedin}
        width={50}
        height={50}
        onClick={handleLinkedin}
      >
        <use href={`/symbol-defs.svg#linkedin`} />
      </svg>
    </div>
  );
};

export default Linkedin;

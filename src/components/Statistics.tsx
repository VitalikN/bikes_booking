import styles from "../sass/layouts/statistics.module.scss";

const Statistics = ({ data }: any) => {
  const {
    total: { total, available, busy, averagePrice },
  } = data;

  const roundedNumber = averagePrice.toFixed(2);
  return (
    <div className={styles.box}>
      <h3 className={styles.title}>Statistics</h3>
      <ul>
        <li>
          <p className={styles.text}>
            Total Bikes: <span className={styles.chip}>{total}</span>
          </p>
        </li>
        <li>
          <p className={styles.text}>
            Available Bikes : <span className={styles.chip}>{available}</span>
          </p>
        </li>
        <li>
          <p className={styles.text}>
            Booked Bikes: <span className={styles.chip}>{busy}</span>
          </p>
        </li>
        <li>
          <p className={styles.text}>
            Average bike cost:
            <span className={`${styles.chip} ${styles.chip__cost}`}>
              {roundedNumber}
            </span>
            UAH/hr.
          </p>
        </li>
      </ul>
    </div>
  );
};
export default Statistics;

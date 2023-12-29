"use client";

import BikesBookingList from "./BikesBookingList";
import styles from "../sass/layouts/bikesBooking.module.scss";

const BikesBooking = () => {
  return (
    <section>
      <div className={`${styles.container} ${styles.bikesBooking__container}`}>
        <BikesBookingList />
        <h2>Bike Booking</h2>
      </div>
    </section>
  );
};
export default BikesBooking;

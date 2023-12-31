"use client";

import Pagination from "./Pagination";
import AddBike from "./AddBike";
import Statistics from "./Statistics";
import ToastProvider from "./ToastProvider";

import { CgClose } from "react-icons/cg";
import { Bike } from "@/utils/type";
import { useBikesBooking } from "./hooks";
import styles from "../sass/layouts/bikesBooking.module.scss";

const BikesBooking = () => {
  const {
    refetch,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    bikeStatuses,
    data,
    error,
    isLoading,
    handleDelete,
    handleStatusChange,
  } = useBikesBooking();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: </p>;
  }

  return (
    <section>
      <div className={`${styles.container} ${styles.bikesBooking__container}`}>
        <div className={styles.box}>
          <AddBike refetch={refetch} />
          <Statistics data={data} />
        </div>

        {data.total.total === 0 ? (
          <p className={styles.empty_message}>
            Unfortunately, there are currently no bikes available for booking.{" "}
          </p>
        ) : (
          <div className={styles.box__list}>
            <ul className={styles.list}>
              {data &&
                data.data.map(({ _id, id, name, color, price, type }: Bike) => (
                  <li
                    className={`${styles.list__item}  ${
                      bikeStatuses[_id]
                        ? styles[bikeStatuses[_id].toLowerCase()]
                        : styles[type.toLowerCase()]
                    }`}
                    key={_id}
                  >
                    <CgClose
                      onClick={() => handleDelete(_id)}
                      className={styles.close}
                    />

                    <div className={styles.list__box}>
                      <h2 className={styles.list__title}>{name} - </h2>
                      <h3 className={styles.list__subject}>TYPE: {color} </h3>
                    </div>
                    <p className={styles.id}>{id}</p>
                    <div className={styles.list__box}>
                      <h3 className={styles.list__subject}>STATUS:</h3>

                      <select
                        className={styles.select}
                        value={bikeStatuses[_id] || ""}
                        onChange={(event) => handleStatusChange(event, _id)}
                      >
                        <option value="">{type}</option>
                        <option value="Available">Available</option>
                        <option value="Busy">Busy</option>
                        <option value="Unavailable">Unavailable</option>
                      </select>
                      <p className={styles.list__price}>{price} UAH/hr.</p>
                    </div>
                  </li>
                ))}
            </ul>
            <Pagination
              totalItems={data.total.total}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        )}

        <ToastProvider />
      </div>
    </section>
  );
};
export default BikesBooking;

"use client";

import { useGetAllbikesQuery } from "@/redux/bikesBookingApi/bikesBookingApi";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";

import styles from "../sass/layouts/bikesBookingList.module.scss";

type Bike = {
  _id: string;
  name: string;
  color: string;
  price: number;
  type: "Available" | "Busy" | "Unavailable";
};

const BikesBookingList = () => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [bikeStatuses, setBikeStatuses] = useState<Record<string, string>>({});

  const { data, error, isLoading } = useGetAllbikesQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: </p>;
  }
  const handleStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    bikeId: string
  ) => {
    const newType = event.target.value;

    setBikeStatuses((prevStatuses) => ({
      ...prevStatuses,
      [bikeId]: newType,
    }));
  };

  return (
    <ul className={styles.list}>
      {data &&
        data.data.map(({ _id, name, color, price, type }: Bike) => (
          <li
            className={`${styles.list__item}  ${
              bikeStatuses[_id]
                ? styles[bikeStatuses[_id].toLowerCase()]
                : styles[type.toLowerCase()]
            }`}
            key={_id}
          >
            <CgClose
              onClick={() => console.log(_id)}
              className={styles.close}
            />

            <div className={styles.list__box}>
              <h2 className={styles.list__title}>{name} - </h2>
              <h3 className={styles.list__subject}>TYPE: {color} </h3>
            </div>
            <p className={styles.id}>{_id}</p>
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
  );
};
export default BikesBookingList;

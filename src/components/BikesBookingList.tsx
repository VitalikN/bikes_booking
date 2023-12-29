"use client";

import { useGetAllbikesQuery } from "@/redux/bikesBookingApi/bikesBookingApi";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";

import styles from "../sass/layouts/bikesBookingList.module.scss";
import { useUpdateBikeStatusMutation } from "@/redux/userBikesBookingApi/userBikesBookingApi";
import Pagination from "./Pagination";

type Bike = {
  _id: string;
  id: string;
  name: string;
  color: string;
  price: number;
  type: "Available" | "Busy" | "Unavailable";
};

const BikesBookingList = () => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(6);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [bikeStatuses, setBikeStatuses] = useState<Record<string, string>>({});

  const { data, error, isLoading } = useGetAllbikesQuery({
    page: currentPage,
    limit: itemsPerPage,
  });
  const [updateMutation] = useUpdateBikeStatusMutation();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: </p>;
  }
  const handleStatusChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    bikeId: string
  ) => {
    try {
      const newType = event.target.value;

      setBikeStatuses((prevStatuses) => ({
        ...prevStatuses,
        [bikeId]: newType,
      }));
      await updateMutation({
        bikeId: bikeId,
        newType: newType,
      });
      console.log(newType, bikeId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.box}>
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
                onClick={() => console.log(_id)}
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
        totalItems={data.total}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};
export default BikesBookingList;

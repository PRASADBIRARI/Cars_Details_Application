import React from "react";
import axios from "axios";
import styles from "./DetailsPage.module.css";
import { useParams } from "react-router";
import { useState, useEffect } from "react";

function DetailsPage() {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsEroor] = useState(false);
  const { id } = useParams(); // useParam hook for exctracting id which is getting from the api

  const getCrashDetails = () => {
    setIsLoading(true);

    return axios
      .get(
        `https://data.cityofnewyork.us/resource/h9gi-nx95.json/?collision_id=${id}`
      )
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setIsEroor(true);
        setIsLoading(false);
      })
      .finally(() => {
        setIsEroor(false);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getCrashDetails();
  }, []);

  console.log(data[0]);

  return (
    <div className={styles.cont}>
      <section
        className={styles.wrapper}
      >
        <header className={styles.wrapperHead}>
          <h1>ACCIDENT DETAILS</h1>
        </header>

        {/* Showing the stored data in "data" array by mapping through it */}

        <section>
          {isLoading ? (
            <h3 style={{ width: "15%", margin: "auto" }}>Loading...</h3>
          ) : isError ? (
            <h3>Something went wrong...</h3>
          ) : (
            <section
              className={styles.tableCont}
            >
              {/* Using conditional check so that if that perticular field is not available it will not go for the next step */}

              <div className={styles.tableHeader}>
                <span>Title</span>
                <span>Data</span>
              </div>


              <div className={styles.tableRow}>
                <span>Collison Place:	</span>
                <span>{data[0]?.on_street_name}</span>
              </div>

              <div className={styles.tableRow}>
                <span>Crash date</span>
                <span>{data[0]?.crash_date}</span>
              </div>

              <div className={styles.tableRow}>
                <span>Crash time</span>
                <span>{data[0]?.crash_time}</span>
              </div>

              <div className={styles.tableRow}>
                <span>First Vehicle type</span>
                <span>{data[0]?.vehicle_type_code1}</span>
              </div>

              <div className={styles.tableRow}>
                <span>Second Vehicle type</span>
                <span>{data[0]?.vehicle_type_code2}</span>
              </div>


              <div className={styles.tableRow}>
                <span>Pedestrians Injured Status</span>
                <span>{data[0]?.number_of_persons_injured}</span>
              </div>

              <div className={styles.tableRow}>
                <span>Person Casuality Status</span>
                <span>{data[0]?.number_of_persons_killed}</span>
              </div>

              <div className={styles.tableRow}>
                <span>First Vehicle Collison Reason</span>
                <span>{data[0]?.contributing_factor_vehicle_1}</span>
              </div>

              <div className={styles.tableRow}>
                <span>Second Vehicle Collison Reason</span>
                <span>{data[0]?.contributing_factor_vehicle_2}</span>
              </div>


            </section>
          )}
        </section>
      </section>
    </div>
  );
}

export { DetailsPage };

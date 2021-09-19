import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CarMain.module.css";

function CarMain() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsEroor] = useState(false);
  const [page, setPage] = useState(0);
  const [card, setCard] = useState(true);
  const [query, setQuery] = useState("2021-09-13");

  const CrashCarDetails = (date = "2021-9-13", page = 0) => {
    setIsLoading(true);

    return axios
      .get(
        `https://data.cityofnewyork.us/resource/h9gi-nx95.json?crash_date=${date}T00:00:00.000&$offset=${page}&$limit=15`
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
    CrashCarDetails(query, page);
  }, [page]);

  const handleFilter = () => {
    CrashCarDetails(query);
  };

  console.log(data);

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      CrashCarDetails(query);
    }
  };

  return (
    <div className={styles.CarMainCont}>
      <header className={styles.headerCont}>
        <h1>Vehical Crash Details</h1>
      </header>
      <section className={styles.showCardCont}>
        {card ? (
          <div className={styles.showCardGrid}>
            <i
              onClick={() => setCard(!card)}
              className="ri-layout-grid-fill"
            ></i>
          </div>
        ) : (
          <div className={styles.showCardRow}>
            <i
              onClick={() => setCard(!card)}
              className="ri-layout-row-fill"
            ></i>
          </div>
        )}
      </section>

      <section>
        <div>
          <div className={styles.SearchBar}>
            <input
              placeholder="2014-01-21"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleFilter}>Search</button>
          </div>
        </div>
      </section>


      <>
        {card ? (
          <section>
            {isLoading ? (
              <h3>Loading...</h3>
            ) : isError ? (
              <h3>Something went wrong...</h3>
            ) : (
              <section style={{ border: "2px solid red" }}>
                <div
                  className={styles.tableHeader}
                >
                  <div>Vehical Type 1</div>
                  <div>Vehical Type 2</div>
                  <div>Crash Date</div>
                  <div>Crash Time</div>
                  <div>Click Here</div>

                </div>
                <div >
                  {data.map((item) => {
                    return (
                      <Link
                        key={item.collision_id}
                        className={styles.tableRows}
                        to={item.collision_id}
                      >

                        <div>
                          {item.vehicle_type_code1}
                        </div>
                        <div>
                          {item.vehicle_type_code2}
                        </div>
                        <div>
                          {item.crash_date}
                        </div>
                        <div>
                          {item.crash_time}
                        </div>
                        <div>Click Here</div>

                      </Link>
                    );
                  })}
                </div>
                <div className={styles.paginationCont}>
                  <button
                    disabled={page === 0}
                    onClick={() => setPage(page - 15)}
                  >
                    Prev
                  </button>

                  <button onClick={() => setPage(page + 15)}>Next</button>
                </div>
              </section>
            )}
          </section>
        ) : (
          <section>
            {isLoading ? (
              <h3>Loading...</h3>
            ) : isError ? (
              <h3>Something went wrong...</h3>
            ) : (
              <section>
                <div className={styles.cardCont}>
                  {data.map((item) => {
                    return (
                      <div
                        className={styles.cardLinkCont}
                      >
                        <Link
                          key={item.collision_id}
                          to={item.collision_id}
                          className={styles.cardLink}
                        >
                          <div>Vehicle type -1 : {item.vehicle_type_code1}</div>
                          <div>Vehicle type -2 : {item.vehicle_type_code2}</div>
                          <div>Crash date : {item.crash_date}</div>
                          <div>Crash time: {item.crash_time}</div>
                          <div>Click Here</div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
                <div className={styles.paginationCont}>
                  <button
                    disabled={page === 0}
                    onClick={() => setPage(page - 15)}
                  >
                    Prev
                  </button>

                  <button onClick={() => setPage(page + 15)}>Next</button>
                </div>
              </section>
            )}
          </section>
        )}
      </>
    </div>
  );
}

export { CarMain };

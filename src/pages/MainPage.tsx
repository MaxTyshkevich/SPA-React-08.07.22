import React, { useEffect, useState } from "react";
import styles from "./MainPage.module.scss";

import ReactPaginate from "react-paginate";

import { AirportCard } from "../components/AirportCard";
import { AirportFilter } from "../components/AirportFilter";
import { AirportSearch } from "../components/AirportSearch";
import { useAppDispatch, useAppSelector } from "../hook/redux";
import { fetchAirport } from "../store/actions/actionsAction";

const ITEMS_PER_PAGE = 50;

const MainPage = () => {
  const dispath = useAppDispatch();
  const { airports, error, loading, count } = useAppSelector(
    (state) => state.airport
  );

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  console.log(`pageCount: `, pageCount);

  const pageChangeHandler = ({ selected }: { selected: number }) => {
    console.log(selected);
    setPage(selected + 1);
  };

  useEffect(() => {
    dispath(fetchAirport(page, ITEMS_PER_PAGE));
  }, [dispath, page]);

  useEffect(() => {
    setPageCount(Math.ceil(count / ITEMS_PER_PAGE));
  }, [count]);

  return (
    <div className="container mx-auto max-w-[760px] pt-5">
      <AirportSearch />
      <AirportFilter />

      {loading && <p className="text-center text-lg">Loading...</p>}
      {error && <p className="text-center text-lg text-red-600">{error}</p>}

      {airports.map((airport) => (
        <AirportCard key={airport.id} airport={airport} />
      ))}
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={pageChangeHandler}
        containerClassName={styles.pagination}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={() => null}
        activeClassName={styles.active}
      />
    </div>
  );
};

export default MainPage;

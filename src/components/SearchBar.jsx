import "./style.css";
import React, { useEffect, useState } from "react";
import { useFetch } from "./useFetch";
import axios from "axios";
import OneSearchItem from "./OneSearchItem";
import WatchList from "./WatchList";

const SearchBar = () => {
  const [queryFrom, setQueryFrom] = useState("");
  const [from, setFrom] = useState("");
  const [taskData, setTaskData] = useState([]);

  const fetchData = () => {
    axios
      .get("https://instagramclonedata.herokuapp.com/watchList/")
      .then((res) => {
        setTaskData(res.data.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { loading, error, data } = useFetch(
    `https://instagramclonedata.herokuapp.com/tradingApp/search/${queryFrom}`
  );

  const handleChangFrom = (e) => {
    setQueryFrom(e.target.value);
    setFrom(e.target.value);
  };


  const handlePriseUp = () => {
    taskData.sort((a, b) => {
      return a.stockPrise - b.stockPrise;
    });
    setTaskData([...taskData]);
  };

  const handlePriseDown = () => {
    taskData.sort((a, b) => {
      return b.stockPrise - a.stockPrise;
    });
    setTaskData([...taskData]);
  };
  const handleNSEUp = () => {
    taskData.sort((a, b) => {
      return a.stockNSE - b.stockNSE;
    });
    setTaskData([...taskData]);
  };
  const handleNSEDown = () => {
    taskData.sort((a, b) => {
      return b.stockNSE - a.stockNSE;
    });
    setTaskData([...taskData]);
  };

  return (
    <div className="container mt-5">
      <div className="mainContainer">
        <div className="mainBox mb-3">
          <div className="search fs-5">
            <i className="fa fa-list-alt me-2" aria-hidden="true"></i>
            <input
              value={from}
              id="search"
              type="search"
              placeholder=" Search Stocks..."
              autoComplete="off"
              onChange={handleChangFrom}
            />
            <i className="fa fa-search ms-2"></i>
          </div>
          {!queryFrom.trim() ? (
            <></>
          ) : loading ? (
            <div className="suggestions mt-2">
              <p className="spinner-border" role="status"></p>
            </div>
          ) : error ? (
            <div className="suggestions mt-2">
              <h4>No Match !</h4>
            </div>
          ) : (
            <div className="suggestions">
              <table className="table  table-hover fs-5">
                <tbody>
                  {data
                    ? data.map((el) => (
                        <OneSearchItem
                          el={el}
                          fetchData={fetchData}
                          taskData={taskData}
                        />
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="my-5 bglight">
          <p className="text-center fs-1">
            <b>
              <u>Watch-List</u>
            </b>
          </p>
          <div className="allSortBtn mb-5">
            <div>
              <button
                className="btn btn-outline-info me-2"
                onClick={handlePriseDown}
              >
                Price <i className="fa fa-arrow-up ms-2" aria-hidden="true"></i>
              </button>
              <button
                className="btn btn-outline-danger me-2"
                onClick={handlePriseUp}
              >
                Price{" "}
                <i className="fa fa-arrow-down ms-2" aria-hidden="true"></i>
              </button>
            </div>
            <h3 className="">
              <i className="fa fa-long-arrow-left me-3" aria-hidden="true"></i>
              SORT
              <i className="fa fa-long-arrow-right ms-3" aria-hidden="true"></i>
            </h3>
            <div>
              <button
                className="btn btn-outline-info me-2"
                onClick={handleNSEUp}
              >
                NSE <i className="fa fa-arrow-up ms-2" aria-hidden="true"></i>
              </button>
              <button
                className="btn btn-outline-danger me-2"
                onClick={handleNSEDown}
              >
                NSE <i className="fa fa-arrow-down ms-2" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <table className="table table-hover fs-5">
            <tbody>
              {taskData.map((el) => {
                return <WatchList el={el} fetchData={fetchData} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

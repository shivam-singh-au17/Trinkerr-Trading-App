import "./style.css";
import React, { useEffect, useState } from "react";
import { useFetch } from "./useFetch";
import axios from "axios";

const SearchBar = () => {
  const [queryFrom, setQueryFrom] = useState("");
  const [from, setFrom] = useState("");
  const [taskData, setTaskData] = useState([]);
  const [styleBtn, setStyleBtn] = useState(false);
  const [styleBtnDel, setStyleBtnDel] = useState(false);

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

  const handleAddStock = (item) => {
    const jsonData = {
      mainId: item._id,
      stockName: item.stockName,
      stockPrise: item.stockPrise,
      stockNSE: item.stockNSE,
    };
    axios
      .post("https://instagramclonedata.herokuapp.com/watchList/", jsonData)
      .then(() => {
        fetchData();
      });
    alert("Successfully added stock ...");
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://instagramclonedata.herokuapp.com/watchList/${id}`)
      .then(() => {
        fetchData();
      });
    alert("Successfully deleted stock ...");
  };

  const handleDeleteAdded = (id) => {
    const addedDelete = taskData.filter((item) => {
      return item.mainId === id ? item._id : "";
    });
    axios
      .delete(
        `https://instagramclonedata.herokuapp.com/watchList/${addedDelete[0]._id}`
      )
      .then(() => {
        fetchData();
      });
    alert("Successfully deleted stock ...");
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
                        <tr
                          key={el._id}
                          className="searchSpace"
                          onMouseEnter={(e) => {
                            setStyleBtn(true);
                            taskData.map((item) => {
                              return item.mainId === el._id
                                ? setStyleBtnDel(true)
                                : setStyleBtnDel(false);
                            });
                          }}
                          onMouseLeave={(e) => {
                            setStyleBtn(false);
                          }}
                        >
                          <td className="searchTd">
                            <b>
                              {(
                                100 -
                                ((el.stockPrise - el.stockNSE / el.stockNSE) /
                                  el.stockPrise) *
                                  100
                              ).toFixed(2) >= 1 ? (
                                <b className="text-info">
                                  {" "}
                                  {el.stockName.split("::")[0]}
                                </b>
                              ) : (
                                <b className="text-danger">
                                  {" "}
                                  {el.stockName.split("::")[0]}
                                </b>
                              )}
                            </b>
                            <span>{el.stockName.split("::")[1]}</span>
                          </td>
                          <td className="searchTdBtn">
                            <button
                              className="btn btn-success"
                              onClick={() => handleAddStock(el)}
                              data-bs-toggle="tooltip"
                              data-bs-placement="right"
                              title="Click here to add"
                              style={
                                styleBtn === true
                                  ? { display: "block" }
                                  : { display: "none" }
                              }
                            >
                              <i
                                className="fa fa-plus-square"
                                aria-hidden="true"
                              ></i>
                            </button>
                            <button
                              style={
                                styleBtnDel === true
                                  ? { display: "block" }
                                  : { display: "none" }
                              }
                              className="btn btn-danger"
                              onClick={() => handleDeleteAdded(el._id)}
                              data-bs-toggle="tooltip"
                              data-bs-placement="right"
                              title="Click here to delete"
                            >
                              <i
                                className="fa fa-trash-o"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </td>
                          <td className="searchTd">
                            <b>
                              {(
                                100 -
                                ((el.stockPrise - el.stockNSE / el.stockNSE) /
                                  el.stockPrise) *
                                  100
                              ).toFixed(2) >= 1 ? (
                                <b className="text-info">{el.stockPrise}</b>
                              ) : (
                                <b className="text-danger">{el.stockPrise}</b>
                              )}
                            </b>
                            <span>
                              {(
                                100 -
                                ((el.stockPrise - el.stockNSE / el.stockNSE) /
                                  el.stockPrise) *
                                  100
                              ).toFixed(2) >= 1 ? (
                                <>
                                  <i
                                    className="fa fa-caret-up me-1 text-info"
                                    aria-hidden="true"
                                  ></i>
                                  {(
                                    100 -
                                    ((el.stockPrise -
                                      el.stockNSE / el.stockNSE) /
                                      el.stockPrise) *
                                      100
                                  ).toFixed(2)}
                                </>
                              ) : (
                                <>
                                  <i
                                    className="fa fa-caret-down me-1 text-danger"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  -
                                  {(
                                    100 -
                                    ((el.stockPrise -
                                      el.stockNSE / el.stockNSE) /
                                      el.stockPrise) *
                                      100
                                  ).toFixed(2)}
                                </>
                              )}
                              %
                            </span>
                          </td>
                        </tr>
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
              <u>All Stocks</u>
            </b>
          </p>
          <div className="allSortBtn mb-5">
            <div>
              <button
                className="btn btn-outline-info me-2"
                onClick={handlePriseDown}
              >
                Prise <i className="fa fa-arrow-up ms-2" aria-hidden="true"></i>
              </button>
              <button
                className="btn btn-outline-danger me-2"
                onClick={handlePriseUp}
              >
                Prise{" "}
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
                return (
                  <tr
                    key={el._id}
                    className="searchSpace"
                    onMouseEnter={(e) => {
                      setStyleBtn(true);
                    }}
                    onMouseLeave={(e) => {
                      setStyleBtn(false);
                    }}
                  >
                    <td className="searchTd">
                      <b>
                        {(
                          100 -
                          ((el.stockPrise - el.stockNSE / el.stockNSE) /
                            el.stockPrise) *
                            100
                        ).toFixed(2) >= 1 ? (
                          <b className="text-info">
                            {" "}
                            {el.stockName.split("::")[0]}
                          </b>
                        ) : (
                          <b className="text-danger">
                            {" "}
                            {el.stockName.split("::")[0]}
                          </b>
                        )}
                      </b>
                      <span>{el.stockName.split("::")[1]}</span>
                    </td>
                    <td>
                      <button
                        style={
                          styleBtn === true
                            ? { display: "block" }
                            : { display: "none" }
                        }
                        className="btn btn-danger mt-2"
                        onClick={() => handleDelete(el._id)}
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        title="Click here to delete"
                      >
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                      </button>
                    </td>
                    <td className="searchTd">
                      <b>
                        {(
                          100 -
                          ((el.stockPrise - el.stockNSE / el.stockNSE) /
                            el.stockPrise) *
                            100
                        ).toFixed(2) >= 1 ? (
                          <b className="text-info">{el.stockPrise}</b>
                        ) : (
                          <b className="text-danger">{el.stockPrise}</b>
                        )}
                      </b>
                      <span>
                        {(
                          100 -
                          ((el.stockPrise - el.stockNSE / el.stockNSE) /
                            el.stockPrise) *
                            100
                        ).toFixed(2) >= 1 ? (
                          <>
                            <i
                              className="fa fa-caret-up me-1 text-info"
                              aria-hidden="true"
                            ></i>
                            {(
                              100 -
                              ((el.stockPrise - el.stockNSE / el.stockNSE) /
                                el.stockPrise) *
                                100
                            ).toFixed(2)}
                          </>
                        ) : (
                          <>
                            <i
                              className="fa fa-caret-down me-1 text-danger"
                              aria-hidden="true"
                            ></i>{" "}
                            -
                            {(
                              100 -
                              ((el.stockPrise - el.stockNSE / el.stockNSE) /
                                el.stockPrise) *
                                100
                            ).toFixed(2)}
                          </>
                        )}
                        %
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

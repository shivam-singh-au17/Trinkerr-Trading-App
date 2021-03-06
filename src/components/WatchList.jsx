import axios from "axios";
import React, { useState } from "react";

const WatchList = (props) => {
  const [styleBtn, setStyleBtn] = useState(false);

  const handleDelete = (id) => {
    axios
      .delete(`https://instagramclonedata.herokuapp.com/watchList/${id}`)
      .then(() => {
        props.fetchData();
      });
    alert("Successfully deleted stock ...");
  };
  return (
    <>
      <tr
        key={props.el._id}
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
              ((props.el.stockPrise - props.el.stockNSE / props.el.stockNSE) /
                props.el.stockPrise) *
                100
            ).toFixed(2) >= 1 ? (
              <b className="text-info"> {props.el.stockName.split("::")[0]}</b>
            ) : (
              <b className="text-danger">
                {" "}
                {props.el.stockName.split("::")[0]}
              </b>
            )}
          </b>
          <span>{props.el.stockName.split("::")[1]}</span>
        </td>
        <td>
          <button
            style={
              styleBtn === true ? { display: "block" } : { display: "none" }
            }
            className="btn btn-danger mt-2"
            onClick={() => handleDelete(props.el._id)}
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
              ((props.el.stockPrise - props.el.stockNSE / props.el.stockNSE) /
                props.el.stockPrise) *
                100
            ).toFixed(2) >= 1 ? (
              <b className="text-info">{props.el.stockPrise}</b>
            ) : (
              <b className="text-danger">{props.el.stockPrise}</b>
            )}
          </b>
          <span>
            {(
              100 -
              ((props.el.stockPrise - props.el.stockNSE / props.el.stockNSE) /
                props.el.stockPrise) *
                100
            ).toFixed(2) >= 1 ? (
              <>
                <i
                  className="fa fa-caret-up me-1 text-info"
                  aria-hidden="true"
                ></i>
                {(
                  100 -
                  ((props.el.stockPrise -
                    props.el.stockNSE / props.el.stockNSE) /
                    props.el.stockPrise) *
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
                  ((props.el.stockPrise -
                    props.el.stockNSE / props.el.stockNSE) /
                    props.el.stockPrise) *
                    100
                ).toFixed(2)}
              </>
            )}
            %
          </span>
        </td>
      </tr>
    </>
  );
};

export default WatchList;

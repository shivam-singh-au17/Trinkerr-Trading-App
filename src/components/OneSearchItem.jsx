import axios from "axios";
import React, { useState } from "react";

const OneSearchItem = (props) => {
  const [styleBtn, setStyleBtn] = useState(null);
  const [styleBtnDel, setStyleBtnDel] = useState(null);

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
        props.fetchData();
      });
    alert("Successfully added stock ...");
  };

  const handleDeleteAdded = (id) => {
    const addedDelete = props.taskData.filter((item) => {
      return item.mainId === id ? item._id : "";
    });
    axios
      .delete(
        `https://instagramclonedata.herokuapp.com/watchList/${addedDelete[0]._id}`
      )
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
          // setStyleBtn(true);
          props.taskData.map((item) => {
            return item.mainId === props.el._id
              ? setStyleBtnDel(true) || setStyleBtn(false)
              : setStyleBtn(true);
          });
        }}
        onMouseLeave={(e) => {
          setStyleBtn(false);
          setStyleBtnDel(false);
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
        <td className="searchTdBtn">
          <button
            className="btn btn-success"
            onClick={() => handleAddStock(props.el)}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Click here to add"
            style={
              styleBtn === true ? { display: "block" } : { display: "none" }
            }
          >
            <i className="fa fa-plus-square" aria-hidden="true"></i>
          </button>
          <button
            style={
              styleBtnDel === true ? { display: "block" } : { display: "none" }
            }
            className="btn btn-danger"
            onClick={() => handleDeleteAdded(props.el._id)}
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

export default OneSearchItem;

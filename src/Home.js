import './App.css';
import React, { useState } from 'react'
import { useFetch } from './useFetch';

const Home = () => {
    const [queryFrom, setQueryFrom] = useState("");
    const [from, setFrom] = useState("");

    const { loading, error, data } = useFetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${queryFrom}&units=metric&appid=43df43066e5d8f7d79aa588b3b447c58`
    );

    const handleChangFrom = (e) => {
        setQueryFrom(e.target.value);
        setFrom(e.target.value);
    };

    return (
        <div className="container mt-3">
            <div className="mainContainer">
                <div className="mainBox mb-3">
                    <div className="search fs-5">
                        <i className="fa fa-map-marker me-2"></i>
                        <input
                            value={from}
                            id="search"
                            type="search"
                            placeholder=" Search"
                            autoComplete="off"
                            onChange={handleChangFrom}
                        />
                        <i className="fa fa-search ms-2"></i>
                    </div>
                    {!queryFrom.trim() ? (
                        <></>
                    ) : loading ? (
                        <div className="suggestions mt-2">
                            <h4>Loading...</h4>
                        </div>
                    ) : error ? (
                        <div className="suggestions mt-2">
                            <h4>No match !</h4>
                        </div>
                    ) : (
                        <div className="suggestions">
                            <table className="table table-hover fs-5">
                                <tbody>
                                    {/* {data
                                    ? data.map((el) => ( */}
                                    <tr
                                        button
                                        onClick={() => {
                                            setFrom(`${data.name}, ${data.sys.country}`);
                                            setQueryFrom("");
                                        }}
                                        key={data.id}
                                    >
                                        <td>
                                            {data.name}, {data.sys.country}
                                        </td>
                                    </tr>
                                    ))
                                    {/* : ""} */}
                                </tbody>
                            </table>
                        </div>
                    )}


                </div>

            </div>

        </div>
    )
}

export default Home

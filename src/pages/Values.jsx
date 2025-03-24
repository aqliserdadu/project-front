import React from "react";

function Values() {
    const temperatures = Array(15).fill({ temp: 90.0, date: "13-03-2025", time: "15:02" });
    
    return (
        <div className="container mt-2" style={{ maxHeight: "700px", overflowY: "auto" }}>
            <div className="row">
                {temperatures.map((data, index) => (
                    <div className="col-lg-3 col-md-3 mt-3" key={index}>
                        <div className="card">
                            <div className="card-head">
                                <div className="card-title text-center">
                                    <h4>Temperature</h4>
                                </div>
                            </div>
                            <div className="card-body text-center">
                                <h1>{data.temp}</h1>
                                <span style={{ fontSize: "30px" }}>&deg;C</span>
                                <p>{data.date} | {data.time}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Values;


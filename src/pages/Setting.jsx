import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Setting() {
  const navigate = useNavigate();

  // State Hooks for Controlled Inputs
  const [interval, setInterval] = useState("");
  const [email, setEmail] = useState("");
  const [autoMeasure, setAutoMeasure] = useState(false);

  const handleSave = () => {
    console.log("Settings saved:", { interval, email, autoMeasure });
    // You may add API calls here to save data
  };

  const handleEdit = (id)=>{

    navigate(`/editsensor/${id}`)
  } 
  
  return (
    <div className="container mt-3">
      {/* General Settings Section */}
      <div className="row">
        <div className="col-lg-12">
          <div
            className="bg-black text-white p-2 mt-2 rounded"
          >
            <h3>General Settings</h3>
          </div>

          <div className="row mt-2">
            <label style={{ fontSize: "20px", fontWeight: "bold" }}>
              Sampling interval :
            </label>
            <div className="input-group form-group">
              <input
                type="number"
                min="0"
                className="form-control input-field"
                value={interval}
                onChange={(e) => setInterval(e.target.value)}
              />
              <span className="input-group-text">Seconds</span>
            </div>
          </div>
          <div className="row mt-2">
            <label style={{ fontSize: "20px", fontWeight: "bold" }}>
              Email Address :
            </label>
            <div className="input-group form-group">
              <input
                type="email"
                className="form-control input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="input-group-text">
                For sending backup data (monthly)
              </span>
            </div>
          </div>

          <div className="row mt-3">
            <label style={{ fontSize: "20px", fontWeight: "bold" }}>
              Auto Measure :
            </label>
            <div className="input-group form-group">
              <div className="form-check form-switch">
                <input
                  style={{ width: "80px", height: "25px" }}
                  type="checkbox"
                  className="form-check-input toggle-switch"
                  checked={autoMeasure}
                  onChange={() => setAutoMeasure(!autoMeasure)}
                />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button className="btn btn-success" onClick={handleSave}>
                <i className="fa fa-save"></i> Save
            </button>
          </div>
        </div>
      </div>

      {/* Sensor Settings Section */}
      <div className="row mt-4">
        <div className="col-lg-12">
          <div
            className="bg-black text-white p-2 mt-2 rounded"
          >
            <h3>Sensor Settings</h3>
          </div>

          <div className="d-flex justify-content-end">
            <button
              className="btn btn-success mt-2  mx-2"
              onClick={() => navigate("/addrainsensor")}
            >
              <i className="fa fa-plus"></i> Add Rain Sensor
            </button>
            <button
              className="btn btn-success mt-2 "
              onClick={() => navigate("/addsensor")}
            >
              <i className="fa fa-plus"></i> Add Sensor
            </button>
          </div>

          <div style={{ maxHeight: "220px", overflowY: "auto" }}>
            <div className="table-responsive mt-3">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>SENSOR NAME</th>
                    <th>PARAMETER NAME</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {id:"1", name: "AT500", parameters: "pH, TSS, NH3N" },
                    {id:"2", name: "AT500", parameters: "pH, TSS, NH3N" },
                    {id:"3", name: "AT500", parameters: "pH, TSS, NH3N" },
                    {id:"4", name: "Mace", parameters: "Debit" },
                    {id:"5", name: "Spectro::lyser", parameters: "COD, BOD" },
                  ].map((sensor, index) => (
                    <tr key={index}>
                      <td>{sensor.name}</td>
                      <td>{sensor.parameters}</td>
                      <td>
                        <button className="btn btn-warning btn-sm mx-2" onClick={()=>handleEdit(sensor.id)}>
                          <i className="fa fa-edit" ></i>
                        </button>
                        <button className="btn btn-danger btn-sm">
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;

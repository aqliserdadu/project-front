import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Setting() {
  const navigate = useNavigate();

  // State Hooks for Controlled Inputs
  // Gunakan useRef untuk mencegah pemanggilan ambilData lebih dari sekali
  const hasFetched = useRef(false);

  const [interval, setInterval] = useState("");
  const [email, setEmail] = useState("");
  const [autoMeasure, setAutoMeasure] = useState(false);
  const [dataSensor, setDataSensor] = useState([]);


  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const ambilData = async()=>{
    try{

      const response = await fetch(`api/setting`)
      const data = await response.json();
      
      if(response.ok){

        setInterval(data.interval)
        setEmail(data.email)
        setAutoMeasure(data.automeasure == 1 ? true:false )
        console.log(data)

      }
      
    }catch(err){

      Swal.fire({
        title:"ERROR!",
        text:err.message,
        confirmButtonText:"ok"
      });

    }
  }

  const ambilSensor = async() =>{

    try{

      const response = await axios.get(`api/ambilSensor`);
      setDataSensor(response.data.data)
      console.log(response.data)

    }catch(error){

      Swal.fire({
        title:"ERROR!",
        text:err.message,
        confirmButtonText:"ok"
      });
    }

  }

  useEffect(()=>{
    if (!hasFetched.current) {
      ambilData();
      ambilSensor();
      hasFetched.current = true;
    }
  },[])

  const handleSave = async () => {

    
    if (!interval) {
      return Swal.fire({
        title: "Warning!",
        text: "Data Interval cannot be empty!",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
    if (!email) {
      return Swal.fire({
        title: "Warning!",
        text: "Email cannot be empty!",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }

    if (!validateEmail(email)) {
      return Swal.fire({
        title: "Warning!",
        text: "Invalid email format!",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }

    
    try {
      const params = JSON.stringify({
        interval,
        email,
        automeasure : autoMeasure ? 1 : 0,
      });

      const queryparams = new URLSearchParams(JSON.parse(params));
      const url = `api/saveSetting?${queryparams}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: data.message,
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      console.error("Error saving settings:", err);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleEdit = (id) => {
    navigate(`/editsensor/${id}`);
  };

  return (
    <div className="container mt-3">
      {/* General Settings Section */}
      <div className="row">
        <div className="col-lg-12">
          <div className="bg-black text-white p-2 mt-2 rounded">
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
          <div className="bg-black text-white p-2 mt-2 rounded">
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
                  {dataSensor.map((sensor, index) => (
                    <tr key={index}>
                      <td>{sensor.sensorname}</td>
                      <td>{sensor.parameters}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm mx-2"
                          onClick={() => handleEdit(sensor.id)}
                        >
                          <i className="fa fa-edit"></i>
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

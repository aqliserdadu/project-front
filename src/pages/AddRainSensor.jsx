import React from "react";
import { useNavigate } from "react-router-dom";


function AddRainSensor() {
    const navigate = useNavigate();
    return (<>
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-12 col-lg-12">
                    <div className="bg-black text-white p-2 mt-2 rounded">
                        <h3>Rain sensor digital settings</h3>

                    </div>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 mt-3">
                            <label style={{ fontSize: "20px", fontWeight:"bold" }}>Sensor name :</label>
                            <input type="text" id="sensor" name="sensor" className="form-control" />
                        </div>
                    </div>

                    <div className="row mt-3">
                    <label style={{ fontSize: "20px", fontWeight:"bold" }}>Tipping volume :</label>
                            
                        <div className="col-md-12 col-lg-12 input-group ">
                            <input type="text" id="tipping" name="tipping" className="form-control" />
                            <span className="input-group-text">ml</span>
                        </div>
                    </div>


                   

                    <div className="d-flex justify-content-between mt-5">
                        <button className="btn btn-dark" onClick={() => navigate(-1)}>
                            <i className="fa fa-arrow-left"></i> Back
                        </button>
                        <button className="btn btn-success">
                            <i className="fa fa-save"></i> Save
                        </button>
                    </div>
                </div>
            </div>
        </div>


    </>)
}


export default AddRainSensor
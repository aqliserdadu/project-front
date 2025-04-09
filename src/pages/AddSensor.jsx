import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddSensor() {
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  //Penggunaan untuk Port
  // State untuk menyimpan daftar port dan port yang dipilih
  const [disable, setDisable] = useState(false);
  const [selectedPort, setSelectedPort] = useState("");
  const [optionParameter, setOptionParameter] = useState([]);

  const ambilPort = async () => {
    try {
      const response = await fetch(`api/ambilPort`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setDisable(data.data.length === 0);
      setSelectedPort(data.data);
    } catch (err) {
      console.log(err.message);
      Swal.fire({
        title: "ERROR!",
        text: err.message,
        icon: "error",
        confirmButtonText: "ok",
      });
    }
  };

  const ambilParameter = async () => {
    try {
      const response = await axios.get(`api/ambilParameter`);
      if (response.status === 200 && response.data.success) {
        setOptionParameter(response.data.data); // Perbaiki untuk memperbarui dengan benar
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      ambilPort();
      ambilParameter();
      hasFetched.current = true;
    }
  }, []);

  // State untuk menyimpan data sensor
  const [sensorSettings, setSensorSettings] = useState({
    sensorName: "",
    dataBits: "",
    port: "",
    stopBits: "",
    baudRate: "",
    parity: "",
    slaveID: "",
    length: "",
    functionCode: "",
    address: "",
    crc: "",
    metode: "",
  });

  // State untuk menyimpan parameter
  const [parameters, setParameters] = useState([
    { parameterName: "", dataParsing: "", postProcessing: "", unit: "" },
  ]);

  // Mengupdate nilai input sensor
  const handleSensorChange = (field, value) => {
    setSensorSettings((prev) => ({ ...prev, [field]: value }));
    console.log("port",sensorSettings.port);
    console.log("function",sensorSettings.functionCode);
  };

  // Mengupdate nilai parameter
  const handleParameterChange = (index, field, value) => {
    const updatedParameters = [...parameters];
    updatedParameters[index][field] = value;
    setParameters(updatedParameters);
  };

  // Menambah parameter baru
  const addParameterForm = () => {
    setParameters([
      ...parameters,
      {
        parameterName: "",
        dataParsing: "",
        postProcessing: "",
        unit: "",
      },
    ]);
  };

  // Menghapus parameter (minimal 1 parameter harus ada)
  const removeParameter = (index) => {
    if (parameters.length > 1) {
      setParameters(parameters.filter((_, i) => i !== index));
    }
  };

  // Mengirim data ke API
  const handleSubmit = async () => {
    if (
      !sensorSettings.sensorName ||
      !sensorSettings.dataBits ||
      !sensorSettings.port ||
      !sensorSettings.stopBits ||
      !sensorSettings.parity ||
      !sensorSettings.slaveID ||
      !sensorSettings.baudRate ||
      !sensorSettings.length ||
      !sensorSettings.functionCode ||
      !sensorSettings.metode ||
      !sensorSettings.address ||
      !sensorSettings.crc
    ) {
      Swal.fire({
        title: "Warning!",
        text: "Harap isi semua data sensor sebelum menyimpan",
        icon: "warning",
        confirmButtonText: "Ok",
        timer: 2000,
      });
      return;
    }

    if (
      parameters.some(
        (param) =>
          param.parameterName.trim() === "" ||
          param.postProcessing.trim() === "" ||
          param.dataParsing.trim() === "" ||
          param.unit.trim() === ""
      )
    ) {
      Swal.fire({
        title: "Warning!",
        text: "Harap Isi Semua Data Parameter!",
        icon: "warning",
        confirmButtonText: "Ok",
        timer: 2000,
      });
      return;
    }

    const payload = {
      sensorSettings: { ...sensorSettings },
      parameters,
    };

    try {
      const response = await axios.get(`api/saveSensor`, {
        params: payload,
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Data berhasil disimpan!",
          icon: "success",
          confirmButtonText: "Ok",
        });
        navigate(-1); // Navigate back
      } else {
        Swal.fire({
          title: "Error!",
          text: "Gagal menyimpan data.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div
          style={{ maxHeight: "700px", overflowY: "auto", marginTop: "5px" }}
        >
          <div className="col-12">
            {/* Sensor Settings Header */}
            <div className="bg-black text-white p-2 mt-2 rounded">
              <h3>Sensor Settings (RS485)</h3>
            </div>

            {/* Sensor Settings Form */}
            <div className="row mt-3">
              <div className="col-md-6">
                <label>
                  <b>Sensor Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={sensorSettings.sensorName}
                  onChange={(e) =>
                    handleSensorChange("sensorName", e.target.value)
                  }
                />
              </div>
              <div className="col-md-6">
                <label>
                  <b>Data Bits</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={sensorSettings.dataBits}
                  onChange={(e) =>
                    handleSensorChange("dataBits", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <label>
                  <b>Port</b>
                </label>
                <div className="input-group">
                  <select
                    className="form-control"
                    value={sensorSettings.port}
                    onChange={(e) => handleSensorChange("port", e.target.value)}
                    disabled={disable ? true : false}
                  >
                    <option value="">Pilih Port</option>
                    {selectedPort.length > 0 ? (
                      selectedPort.map((tampil, index) => (
                        <option key={index} value={tampil}>
                          {tampil}
                        </option>
                      ))
                    ) : (
                      <option>Tidak tersedia...</option>
                    )}
                  </select>
                  <span className="input-group-text" onClick={ambilPort}>
                    <i className="fa fa-sync-alt"></i>
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <label>
                  <b>Stop Bits</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={sensorSettings.stopBits}
                  onChange={(e) =>
                    handleSensorChange("stopBits", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <label>
                  <b>Baud Rate</b>
                </label>
                <select
                  className="form-control"
                  value={sensorSettings.baudRate}
                  onChange={(e) =>
                    handleSensorChange("baudRate", e.target.value)
                  }
                >
                  <option value="">Pilih Baud Rate</option>
                  <option value="9600">9600</option>
                  <option value="14400">14400</option>
                  <option value="19200">19200</option>
                  <option value="34400">38400</option>
                  <option value="57600">57600</option>
                  <option value="115200">115200</option>
                </select>
              </div>
              <div className="col-md-6">
                <label>
                  <b>Parity</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={sensorSettings.parity}
                  onChange={(e) => handleSensorChange("parity", e.target.value)}
                />
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <label>
                  <b>Slave ID</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={sensorSettings.slaveID}
                  onChange={(e) =>
                    handleSensorChange("slaveID", e.target.value)
                  }
                />
              </div>
              <div className="col-md-6">
                <label>
                  <b>Length</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={sensorSettings.length}
                  onChange={(e) => handleSensorChange("length", e.target.value)}
                />
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <label>
                  <b>Function Code</b>
                </label>
                <select
                  className="form-control"
                  value={sensorSettings.functionCode}
                  onChange={(e) =>
                    handleSensorChange("functionCode", e.target.value)
                  }
                >
                  <option value="">Pilih Function Code</option>
                  <option value="0x01">0x01</option>
                  <option value="0x02">0x02</option>
                  <option value="0x03">0x03</option>
                  <option value="0x04">0x04</option>
                  <option value="0x05">0x05</option>
                  <option value="0x06">0x06</option>
                  <option value="0x07">0x07</option>
                  <option value="0x08">0x08</option>
                  <option value="0x0B">0x0B</option>
                  <option value="0x0F">0x0F</option>
                  <option value="0x10">0x10</option>
                  <option value="0x11">0x11</option>
                  <option value="0x16">0x16</option>
                  <option value="0x17">0x17</option>
                </select>
              </div>
              <div className="col-md-6">
                <label>
                  <b>Address</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={sensorSettings.address}
                  onChange={(e) =>
                    handleSensorChange("address", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <label>
                  <b>CRC</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={sensorSettings.crc}
                  onChange={(e) => handleSensorChange("crc", e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>
                  <b>Metode</b>
                </label>
                <select
                  className="form-control"
                  value={sensorSettings.metode}
                  onChange={(e) => handleSensorChange("metode", e.target.value)}
                >
                  <option value=""> Pilih Metode</option>
                  <option value="Standar">Standar</option>
                  <option value="IEEE745">IEEE745</option>
                </select>
              </div>
            </div>

            {/* Parameter Settings Header */}
            <div className="bg-black text-white p-2 mt-3 rounded">
              <h3>Parameter Settings</h3>
            </div>

            {/* Parameter Settings Form */}

            {parameters.map((param, index) => (
              <div key={index} className="p-3 border rounded mb-2 bg-light">
                <div className="row">
                  <div className="col-md-5">
                    <label>
                      <b>Parameter Name</b>
                    </label>
                    <select
                      name="parameter"
                      className="form-control"
                      onChange={(e) =>
                        handleParameterChange(
                          index,
                          "parameterName",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Pilih Parameter Name</option>
                      {optionParameter.length > 0 ? (
                        optionParameter.map((item) => (
                          <option key={item.parameter} value={item.parameter}>
                            {item.parameter}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          No Parameters Available
                        </option>
                      )}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label>
                      <b>Data Parsing</b>
                    </label>
                    <input
                      type="text"
                      value={param.dataParsing}
                      onChange={(e) =>
                        handleParameterChange(
                          index,
                          "dataParsing",
                          e.target.value
                        )
                      }
                      className="form-control"
                    />
                  </div>
                  {parameters.length > 1 && (
                    <div className="col-md-1 d-flex align-items-end">
                      <button
                        className="btn btn-danger"
                        onClick={() => removeParameter(index)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  )}
                </div>

                <div className="row mt-2">
                  <div className="col-md-5">
                    <label>
                      <b>Post Processing</b>
                    </label>
                    <input
                      type="text"
                      value={param.postProcessing}
                      onChange={(e) =>
                        handleParameterChange(
                          index,
                          "postProcessing",
                          e.target.value
                        )
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>
                      <b>Unit</b>
                    </label>
                    <select
                      value={param.unit}
                      onChange={(e) =>
                        handleParameterChange(index, "unit", e.target.value)
                      }
                      className="form-control"
                    >
                      <option value="">Pilih Unit</option>
                      <option value="mg/I">mg/I</option>
                      <option value="m3">min</option>
                      <option value="mm/min">mm/min</option>
                      <option value="kosong"></option>
                    </select>
                  </div>
                </div>
              </div>
            ))}

            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-dark" onClick={() => navigate(-1)}>
                <i className="fa fa-arrow-left"></i> Back
              </button>
              <button className="btn btn-info" onClick={addParameterForm}>
                <i className="fa fa-plus"></i> Add Parameter
              </button>
              <button className="btn btn-success" onClick={handleSubmit}>
                <i className="fa fa-save"></i> Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSensor;

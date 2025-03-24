import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddSensor() {
  const navigate = useNavigate();

  // State untuk menyimpan daftar port dan port yang dipilih
  const [ports, setPorts] = useState([]);
  const [selectedPort, setSelectedPort] = useState("");

  // State untuk menyimpan data sensor
  const [sensorSettings, setSensorSettings] = useState({
    sensorName: "",
    dataBits: "",
    stopBits: "",
    baudRate: "",
    parity: "",
    slaveID: "",
    length: "",
    functionCode: "",
    metode: "standar",
  });

  // State untuk menyimpan parameter
  const [parameters, setParameters] = useState([
    { parameterName: "", dataParsing: "", postProcessing: "", unit: "standar" },
  ]);

  // Mengambil daftar port dari API saat halaman dimuat
  useEffect(() => {
    const fetchPorts = async () => {
      try {
        const response = await fetch("http://103.10.12.200/ambilPort");
        if (response.ok) {
          const data = await response.json();
          setPorts(data);
          if (data.length > 0) {
            setSelectedPort(data[0]); // Pilih port pertama sebagai default
          }
        } else {
          console.error("Gagal mengambil daftar port.");
        }
      } catch (error) {
        console.error("Error mengambil port:", error);
      }
    };

    fetchPorts();
  }, []);

  // Mengupdate nilai input sensor
  const handleSensorChange = (field, value) => {
    setSensorSettings((prev) => ({ ...prev, [field]: value }));
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
        unit: "standar",
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
      !selectedPort ||
      !sensorSettings.stopBits ||
      !sensorSettings.parity ||
      !sensorSettings.slaveID ||
      !sensorSettings.length ||
      !sensorSettings.functionCode ||
      !sensorSettings.metode
    ) {
      alert("Harap isi semua data sensor sebelum menyimpan.");
      return;
    }

    if (parameters.some((param) => param.parameterName.trim() === "")) {
      alert("Nama Parameter tidak boleh kosong.");
      return;
    }

    const payload = {
      sensorSettings: { ...sensorSettings, port: selectedPort },
      parameters,
    };

    try {
      const response = await fetch("http://103.10.12.11/saveParameter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Data berhasil disimpan!");
        navigate(-1);
      } else {
        alert("Gagal menyimpan data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
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
                onChange={(e) => handleSensorChange("dataBits", e.target.value)}
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-6">
              <label>
                <b>Port</b>
              </label>
              <select
                className="form-control"
                value={selectedPort}
                onChange={(e) => setSelectedPort(e.target.value)}
              >
                {ports.length > 0 ? (
                  ports.map((port, index) => (
                    <option key={index} value={port}>
                      {port}
                    </option>
                  ))
                ) : (
                  <option>Loading...</option>
                )}
              </select>
            </div>
            <div className="col-md-6">
              <label>
                <b>Stop Bits</b>
              </label>
              <input
                type="text"
                className="form-control"
                value={sensorSettings.stopBits}
                onChange={(e) => handleSensorChange("stopBits", e.target.value)}
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
                onChange={(e) => handleSensorChange("baudRate", e.target.value)}
              >
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
                onChange={(e) => handleSensorChange("slaveID", e.target.value)}
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
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
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
                <option value="standar">Standar</option>
                <option value="no standar">NO Standar</option>
              </select>
            </div>
          </div>

          {/* Parameter Settings Header */}
          <div className="bg-black text-white p-2 mt-3 rounded">
            <h3>Parameter Settings</h3>
          </div>

          {/* Parameter Settings Form */}
          <div
            style={{ maxHeight: "220px", overflowY: "auto", marginTop: "5px" }}
          >
            {parameters.map((param, index) => (
              <div key={index} className="p-3 border rounded mb-2 bg-light">
                <div className="row">
                  <div className="col-md-5">
                    <label>
                      <b>Parameter Name</b>
                    </label>
                    <input
                      type="text"
                      value={param.parameterName}
                      onChange={(e) =>
                        handleParameterChange(
                          index,
                          "parameterName",
                          e.target.value
                        )
                      }
                      className="form-control"
                    />
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
                      <option value="standar">Standar</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}

            <div className="d-flex justify-content-between mt-3">
              <button
                className="btn btn-dark"
                onClick={() => navigate(-1)}
              >
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

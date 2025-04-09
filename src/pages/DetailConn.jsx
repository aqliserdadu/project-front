import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";

function DetailConn() {
  const navigate = useNavigate();
  const hasFetched = useRef(false);
  const [status, setStatus] = useState(false);
  const [isCek, setIsCek] = useState(false);
  const [ssid, setSsid] = useState("");
  const [ipAddress, setIpAddress] = useState(""); // Corrected the variable name
  const [netmask, setNetMask] = useState("");
  const [gateway, setGateway] = useState("");
  const [dns, setDns] = useState([]);

  const getWifiDetail = async () => {
    try {
      const response = await fetch(`api/detailConn`);
      const data = await response.json();

      if (response.ok) {
        setSsid(data.wifi.SSID);
        setIpAddress(data.wifi.IP); // Corrected variable name here
        setNetMask(data.wifi.Netmask);
        setGateway(data.wifi.Gateway);
        setDns(data.wifi.DNS);
        setStatus(true);
      }

      if (!response.ok) {
        setStatus(false);
        return Swal.fire({
          title: "Error!",
          text: data.message, // Corrected typo
          icon: "error",
          confirmButtonText: "ok",
        });
      }
    } catch (err) {
      setStatus(false);
      return Swal.fire({
        title: "ERROR!",
        text: err.message, // Corrected typo
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    // Simulasi fetch data koneksi WiFi
    if (!hasFetched.current) {
      getWifiDetail();
      hasFetched.current = true;
    }
  }, []);

  const cekKoneksi = async () => {
    setIsCek(true);
    try {
      const response = await fetch(`api/cekKoneksi`);
      const data = await response.json()
      if (response.ok) {
        return Swal.fire({
          title: "Success!",
          text: data.message,
          icon: "success",
          confirmButtonText: "ok",
        });
      }

      if (!response.ok) {
        return Swal.fire({
          title: "Error!",
          text: data.message,
          icon: "error",
          confirmButtonText: "ok",
        });
      }

    } catch (err) {
      return Swal.fire({
        title: "Error",
        text: err.message, // Corrected typo
        icon: "error",
        confirmButtonText: "ok",
      });
    } finally {
      setIsCek(false);
    }
  };

  return (
    <>
      <div className="container mt-4">
        <div className="card shadow-lg p-4">
          <h3 className="text-center mb-4">Connection Details</h3>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Status:</strong> {status ? "Terhubung..." : "Terputus..."}
            </li>
            {}
            <li className="list-group-item">
              <strong>SSID:</strong> {ssid}
            </li>
            <li className="list-group-item">
              <strong>IP Address:</strong> {ipAddress}
            </li>
            <li className="list-group-item">
              <strong>Netmask:</strong> {netmask}
            </li>
            <li className="list-group-item">
              <strong>Gateway:</strong> {gateway}
            </li>
            <li className="list-group-item">
              <strong>DNS:</strong> {dns.join(", ")}
            </li>
          </ul>

          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-dark" onClick={() => navigate(-1)}>
              <i className="fa fa-arrow-left"></i> Back
            </button>
            <button
              className="btn btn-info"
              onClick={cekKoneksi}
              disabled={isCek}
            >
              <i className="fa fa-gear"></i>{" "}
              {isCek ? "Ping ..." : "Test Koneksi Internet"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailConn;

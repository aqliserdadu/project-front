import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function WifiDetail() {
  const navigate = useNavigate();
  const [wifiInfo, setWifiInfo] = useState({
    ipAddress: "192.168.1.100",
    netmask: "255.255.255.0",
    gateway: "192.168.1.1",
    dns: ["8.8.8.8", "8.8.4.4"],
  });

  useEffect(() => {
    // Simulasi fetch data koneksi WiFi
    setTimeout(() => {
      setWifiInfo({
        ipAddress: "192.168.1.102",
        netmask: "255.255.255.0",
        gateway: "192.168.1.1",
        dns: ["1.1.1.1", "8.8.8.8"],
      });
    }, 1000);
  }, []);

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4">
        <h3 className="text-center mb-4">WiFi Connection Details</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <strong>IP Address:</strong> {wifiInfo.ipAddress}
          </li>
          <li className="list-group-item">
            <strong>Netmask:</strong> {wifiInfo.netmask}
          </li>
          <li className="list-group-item">
            <strong>Gateway:</strong> {wifiInfo.gateway}
          </li>
          <li className="list-group-item">
            <strong>DNS:</strong> {wifiInfo.dns.join(", ")}
          </li>
        </ul>
        <div className="text-center mt-3">
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default WifiDetail;

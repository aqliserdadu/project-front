import { useState } from "react";
import { useNavigate } from "react-router-dom";

function WifiSet() {
  const navigate = useNavigate();

  const wifiDetail = () => {
    navigate("/wifiDetail");
  };

  const [wifiList, setWifiList] = useState([
    "MyHomeWiFi",
    "Office_Network",
    "Guest_WiFi",
    "Coffee_Spot",
    "Public_Hotspot",
  ]);
  const [selectedWifi, setSelectedWifi] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle WiFi selection
  const handleWifiChange = (e) => setSelectedWifi(e.target.value);
  // Handle password input
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Handle Connect Click
  const handleConnect = () => {
    if (!selectedWifi || !password) {
      alert("Please select a WiFi network and enter the password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      alert(`Connected to ${selectedWifi}`);
      setLoading(false);
    }, 2000);
  };

  // Refresh WiFi List
  const handleRefresh = () => {
    setSelectedWifi("");
    setPassword("");
    setWifiList([...wifiList, `New_Wifi_${Math.floor(Math.random() * 100)}`]);
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4">
        <h3 className="text-center mb-4">WiFi Connection</h3>

        {/* Select WiFi */}
        <div className="mb-3">
          <label className="form-label fw-bold">Select WiFi Network</label>
          <select
            className="form-select"
            value={selectedWifi}
            onChange={handleWifiChange}
          >
            <option value="">-- Choose WiFi --</option>
            {wifiList.map((wifi, index) => (
              <option key={index} value={wifi}>
                {wifi}
              </option>
            ))}
          </select>
        </div>

        {/* Password Input */}
        <div className="mb-3">
          <label className="form-label fw-bold">Enter Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="WiFi Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        {/* Buttons */}
        <div className="row mt-2">
          <div className="text-end">
            <button className="btn btn-success mx-2" onClick={handleConnect} disabled={loading}>
              {loading ? <i className="fa fa-spinner fa-spin"></i> : <i className="fa fa-wifi"></i>}{" "}
              {loading ? "Connecting..." : "Connect"}
            </button>

            <button className="btn btn-info mx-2" onClick={wifiDetail}>
              <i className="fa fa-book"></i> Detail Connection
            </button>

            <button className="btn btn-warning" onClick={handleRefresh}>
              <i className="fa fa-sync-alt"></i> Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WifiSet;

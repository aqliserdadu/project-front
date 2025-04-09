import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function WifiSet() {
  const navigate = useNavigate();

  const detailConn = () => {
    navigate("/detailConn");
  };

  const [wifiList, setWifiList] = useState([]);
  const [selectedWifi, setSelectedWifi] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);  // New state for fetching status
  const [connecting, setConnecting] = useState(false);  // New state for connection status

  // Helper function to fetch WiFi networks
  const fetchWifiNetworks = useCallback(async () => {
    setFetching(true);
    try {
      const response = await fetch(`api/ambilWifi`);
      if (!response.ok) throw new Error("Failed to fetch WiFi networks");

      const data = await response.json();

      if (!data.status) {
        Swal.fire({
          title: "Error!",
          text: data.message,
          icon: "error",
          confirmButtonText: "ok",
        });
        return [];
      }

      return data.data; // Return the fetched data
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "ok",
      });
      return [];
    } finally {
      setFetching(false);
    }
  }, []);

  // Fetch WiFi list when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWifiNetworks();
      setWifiList(data);

      // Automatically select the first available WiFi network, or use a previously saved one if available
      if (data.length > 0) {
        const savedNetwork = localStorage.getItem("selectedWifi");
        if (savedNetwork && data.some(wifi => wifi.toLowerCase() === savedNetwork.toLowerCase())) {
          setSelectedWifi(savedNetwork); // Set it if it's available in the list
        } else {
          setSelectedWifi(data[0]); // Set the first available network by default
        }
      }
    };
    fetchData();
  }, [fetchWifiNetworks]);

  // Handle WiFi selection
  const handleWifiChange = (e) => setSelectedWifi(e.target.value);

  // Handle password input
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Handle Connect Click
  const handleConnect = async () => {
    if (!selectedWifi || !password) {
      Swal.fire({
        title: "Warning!",
        text: "Harap Pilih Jaringan Wifi dan Masukan Password!",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      setConnecting(true);  // Set connecting to true when attempting to connect

      const params = JSON.stringify({
        selectedWifi,
        password,
      });

      const queryparams = new URLSearchParams(JSON.parse(params));
      const url = `api/konekWifi?${queryparams}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.status) {
        Swal.fire({
          title: "Success!",
          text: data.message,
          icon: "success",
          confirmButtonText: "OK",
        });

        // Save the selected network for future use
        localStorage.setItem("selectedWifi", selectedWifi);
      } else {
        Swal.fire({
          title: "Warning!",
          text: data.message,
          icon: "warning",
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
    } finally {
      setConnecting(false); // Set connecting to false after the operation is done
    }

    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 1000);
  };

  // Refresh WiFi List
  const handleRefresh = async () => {
    if (fetching) return;  // Don't allow refresh if already fetching
    setLoading(true);
    const data = await fetchWifiNetworks();
    if (data.length > 0) {
      setWifiList(data);
      if (data[0] !== selectedWifi) {
        setSelectedWifi(data[0]);
        setPassword(""); // Clear password only if network changes
      }
    }
    setLoading(false);
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
            disabled={fetching}  // Disable select while fetching data
            aria-label="Select WiFi Network"
          >
            <option value="">-- Choose WiFi --</option>
            {wifiList.length > 0 ? (
              wifiList.map((wifi, index) => (
                <option key={index} value={wifi}>
                  {wifi}
                </option>
              ))
            ) : (
              <option value="">No WiFi networks available</option>
            )}
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
            disabled={fetching}  // Disable input while fetching data
            aria-label="Enter WiFi Password"
          />
        </div>

        {/* Buttons */}
        <div className="row mt-2">
          <div className="text-end">
            <button
              className="btn btn-success mx-2"
              onClick={handleConnect}
              disabled={loading || fetching || connecting}
            >
              {connecting ? <i className="fa fa-spinner fa-spin"></i> : <i className="fa fa-wifi"></i>}{" "}
              {connecting ? "Connecting..." : "Connect"}
            </button>

            <button className="btn btn-info mx-2" onClick={detailConn} disabled={fetching}>
              <i className="fa fa-book"></i> Detail Connection
            </button>

            <button className="btn btn-warning" onClick={handleRefresh} disabled={fetching}>
              <i className="fa fa-sync-alt"></i> {fetching ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WifiSet;

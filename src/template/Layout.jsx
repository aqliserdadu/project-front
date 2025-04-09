import { Outlet, Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import icWifiCon from "../assets/wifi-con.svg";
import icWifiDis from "../assets/wifi-dis.svg";
import icEthCon from "../assets/eth-con.svg";
import icEthDis from "../assets/eth-dis.svg";
import values from "../assets/Values.svg";
import timeSeries from "../assets/TimeSeries.svg";
import service from "../assets/Service.svg";
import setting from "../assets/Setting.svg";
import help from "../assets/Help.svg";
import home from "../assets/Has_solutions.png";
import Swal from "sweetalert2";

function Layout() {
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [wifiCon, setWifiCon] = useState(false);
  const [ethCon, setEthCon] = useState(false);
  const [isOnine, setIsOnline] = useState(false); // Added to manage online state
  const hasFetched = useRef(false);

  const checkNetworkConnection = async () => {
    try {
      // Menjalankan dua permintaan fetch secara paralel
      const [googleResponse, deviceResponse] = await Promise.all([
        fetch("https://www.google.com", {
          method: "GET",
          mode: "no-cors", // Menghindari masalah CORS
        }),
        fetch("api/cekDevice"), // API lokal untuk cek perangkat
      ]);

      // Mengambil data dari respons API lokal
      const data = await deviceResponse.json();

      // Mengecek apakah koneksi ke Google berhasil
      const isGoogleOnline = googleResponse.status === 0;

      // Menampilkan hasil koneksi dan perangkat
      console.log("Koneksi ke Google:", isGoogleOnline ? "Online" : "Offline");
      console.log("Status perangkat:", data.device);

      // Update status koneksi berdasarkan hasil
      updateConnectionState(data.device, isGoogleOnline);
    } catch (error) {
      // Tangani kesalahan jika salah satu fetch gagal
      updateConnectionState(null, false);
      setIsOnline(false);
      console.error("No internet connection detected.", error);
    }
  };

  const updateConnectionState = (device, status) => {
    setIsOnline(status);

    // Pembaruan status koneksi berdasarkan perangkat
    if (device === "wifi") {
      setWifiCon(status);
    } else if (device === "lan") {
      setEthCon(status);
    }
  };

  const updateDateTime = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = now.toLocaleString("id-ID", { month: "long" });
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const formattedDateTime = `${day} ${month} ${year} | ${hours}:${minutes}`;
    setCurrentDateTime(formattedDateTime);

    console.log("Date :", formattedDateTime);
  };

  useEffect(() => {
    // Handle the network status
    if (!hasFetched.current) {
      checkNetworkConnection();
      updateDateTime();
      hasFetched.current = true;
    }

    // Update date-time once when the component mounts
    const dateInterval = setInterval(updateDateTime, 20000); // 10 seconds

    // Set an interval to check network connection every 10 seconds
    const netInterval = setInterval(checkNetworkConnection, 10000);

    // Cleanup intervals on unmount
    return () => {
      clearInterval(dateInterval);
      clearInterval(netInterval);
    };
  }, []);

  return (
    <div className="d-flex flex-column vh-100">
      <div className="flex-grow-1 d-flex">
        <nav
          className="col-md-3 col-lg-2 d-md-block sidebar"
          style={{ backgroundColor: "#606060" }}
        >
          <div className="d-flex flex-column">
            <div
              style={{
                height: "131px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "solid 2px grey",
              }}
            >
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                <div style={{ textAlign: "center" }}>
                  <div className="col-md-12">
                    <img
                      src={home}
                      alt="Home"
                      style={{ width: "70%", height: "auto" }}
                    />
                  </div>
                </div>
              </NavLink>
            </div>
            <NavLink
              to="/values"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <div
                style={{
                  height: "129px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "solid 2px grey",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div className="col-md-12">
                    <img
                      src={values}
                      alt="Values"
                      style={{ width: "40%", height: "auto" }}
                    />
                  </div>
                  <div className="col-md-12 mt-2">
                    <label style={{ color: "black", fontSize: "20px" }}>
                      Values
                    </label>
                  </div>
                </div>
              </div>
            </NavLink>
            <NavLink
              to="/timeSeries"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <div
                style={{
                  height: "129px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "solid 2px grey",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div className="col-md-12">
                    <img
                      src={timeSeries}
                      alt="TimeSeries"
                      style={{ width: "40%", height: "auto" }}
                    />
                  </div>
                  <div className="col-md-12 mt-2">
                    <label style={{ color: "black", fontSize: "20px" }}>
                      Time Series
                    </label>
                  </div>
                </div>
              </div>
            </NavLink>
            <NavLink
              to="/service"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <div
                style={{
                  height: "129px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "solid 2px grey",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div className="col-md-12">
                    <img
                      src={service}
                      alt="Service"
                      style={{ width: "40%", height: "auto" }}
                    />
                  </div>
                  <div className="col-md-12 mt-2">
                    <label style={{ color: "black", fontSize: "20px" }}>
                      Service
                    </label>
                  </div>
                </div>
              </div>
            </NavLink>
            <NavLink
              to="/setting"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <div
                style={{
                  height: "129px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "solid 2px grey",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div className="col-md-12">
                    <img
                      src={setting}
                      alt="Setting"
                      style={{ width: "40%", height: "auto" }}
                    />
                  </div>
                  <div className="col-md-12 mt-2">
                    <label style={{ color: "black", fontSize: "20px" }}>
                      Setting
                    </label>
                  </div>
                </div>
              </div>
            </NavLink>
            <NavLink
              to="/help"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <div
                style={{
                  height: "130px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "solid 2px grey",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div className="col-md-12">
                    <img
                      src={help}
                      alt="Help"
                      style={{ width: "40%", height: "auto" }}
                    />
                  </div>
                  <div className="col-md-12 mt-2">
                    <label style={{ color: "black", fontSize: "20px" }}>
                      Help
                    </label>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
        </nav>
        <main
          className="col-md-9 ms-sm-auto col-lg-10"
          style={{ backgroundColor: "#707070" }}
        >
          <div className="row">
            <div className="d-flex justify-content-end">
              <div style={{ marginRight: "10px", marginTop: "5px" }}>
                <Link to="/wifiSet">
                  <img
                    src={wifiCon && isOnine ? icWifiCon : icWifiDis}
                    alt="Wifi Connection"
                    style={{ height: "25px" }}
                  />
                </Link>
              </div>
              <div style={{ marginRight: "10px", marginTop: "5px" }}>
                <Link to="/detailConn">
                  <img
                    src={ethCon && isOnine ? icEthCon : icEthDis}
                    alt="Ethernet Connection"
                    style={{ height: "25px" }}
                  />
                </Link>
              </div>
            </div>
          </div>

          <div>
            <Outlet />
          </div>
        </main>
      </div>
      <footer
        style={{ backgroundColor: "#00B3BD", marginTop: "-5px" }}
        className="text-light"
      >
        <div className="row">
          <div className="col-md-4 col-lg-4">
            <div
              style={{
                textAlign: "left",
                marginLeft: "30px",
                display: "inline",
              }}
            >
              DAS Citarum
            </div>
            <div
              style={{
                textAlign: "left",
                marginLeft: "100px",
                display: "inline",
              }}
            >
              KLH
            </div>
          </div>

          <div className="col-md-4 col-lg-4">
            <div className="text-center">{currentDateTime}</div>
          </div>

          <div className="col-md-4 col-lg-4">
            <div style={{ textAlign: "right", marginRight: "30px" }}>
              HASLOG V.01.0
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;

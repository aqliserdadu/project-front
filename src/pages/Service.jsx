import { useState } from "react";
import { useNavigate } from "react-router-dom";
import segitiga from "../assets/segitiga.png";

function EnterServiceAwal({ onEnterService }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-lg-12">
          <div className="text-center mt-5">
            <button className="btn btn-dark btn-lg rounded-5 w-50 fs-4" onClick={onEnterService}>
              Enter Service Mode
            </button>
          </div>
          <div style={{ marginTop: "150px" }}>
            <div className="text-center mt-5">
              <img src={segitiga} style={{ width: "250px", height: "auto" }} alt="warning" />
            </div>
            <div className="text-center mt-5">
              <h5>For Professional personnel only.</h5>
              <h5>Any damage or errors resulting from usage</h5>
              <h5>are the responsibility of the user.</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnterService({ cekLogin, loading, error }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div
        style={{
          backgroundColor: "black",
          padding: "5px",
          margin: "50px auto",
          width: "500px",
          height: "80px",
          color: "white",
          textAlign: "center",
          fontSize: "30px",
          fontWeight: "bold",
          borderRadius: "10px",
        }}
      >
        <label style={{ marginTop: "10px" }}>Login for Entering Service Mode</label>
      </div>
      <br />
      <div style={{ padding: "5px", margin: "0 auto", width: "400px" }}>
        <div className="mb-3">
          <h3>Username :</h3>
          <input
            type="text"
            className="form-control-lg rounded-5 w-100"
            placeholder="Masukkan username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <h3>Password :</h3>
          <input
            type="password"
            className="form-control-lg rounded-5 w-100"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-danger text-center">{error}</p>}

        <div className="mt-2 text-end">
          <button onClick={() => cekLogin(username, password)} className="btn btn-light btn-lg w-25 rounded-5" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </div>
    </>
  );
}

function Service() {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function cekLogin(username, password) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const expiryTime = Date.now() + 5 * 60 * 1000; // Waktu sekarang + 10 menit
        localStorage.setItem("user", data.user); 
        localStorage.setItem("time", expiryTime);
        //alert(data.message);
        navigate("/serviceMode");
      } else {
        setError(data.message || "Login gagal, periksa kembali username dan password.");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menghubungi server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {isLoginMode ? <EnterService cekLogin={cekLogin} loading={loading} error={error} /> : <EnterServiceAwal onEnterService={() => setIsLoginMode(true)} />}
    </>
  );
}

export default Service;

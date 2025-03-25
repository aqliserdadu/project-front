import { useState } from "react";
import { useNavigate } from "react-router-dom";
import segitiga from "../assets/segitiga.png"

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
              <img src={segitiga} style={{width:"250px",height:"auto"}} />
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

function EnterService({ cekLogin }) {
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
          height:"80px",
          color: "white",
          textAlign: "center",
          fontSize:"30px",
          fontWeight:"bold",
          borderRadius:"10px"
        }}
      >
        <label style={{marginTop:"10px"}}>Login for Entering Service Mode</label>
      </div>
      <br />
      <div style={{ padding: "5px", margin: "0 auto", width: "400px" }}>
        <div className="mb-3">
          <h3>Username :</h3>
          <input
            type="text"
            className="form-control-lg rounded-5 w-100"
            id="username"
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
            id="password"
            value={password}
            placeholder="Masukkan password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

<div className="mt-2 text-end">
        <button
          onClick={() => cekLogin(username, password)}
          className="btn btn-light btn-lg w-25 rounded-5"
        >
          Login
        </button>
      </div>
      </div>
    </>
  );
}

function Service() {
    const [isLoginMode, setIsLoginMode] = useState(false);
    const navigate = useNavigate();
  function cekLogin(username, password) {
    if (username === "abu" && password === "abu") {
      alert("Berhasil");

      navigate("/serviceLogin");
    } else {
      alert("Gagal");
    }
  }

  return (
    <>
      {isLoginMode ? (
        <EnterService cekLogin={cekLogin} />
      ) : (
        <EnterServiceAwal onEnterService={() => setIsLoginMode(true)} />
      )}
    </>
  );
}

export default Service;

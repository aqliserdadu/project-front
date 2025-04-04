import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ServiceMode() {
  const navigate = useNavigate();


  useEffect(() => {
    const user = localStorage.getItem("user");
    const time = localStorage.getItem("time");
    if (!user || !time || Date.now() > time) {
      localStorage.removeItem("user");
      localStorage.removeItem("time");
      navigate("/service"); // Kembali ke login jika token expired
  }
}, []);


const logout = () =>{

  localStorage.removeItem("user");
  navigate("/service");
}

  const data = [
    { parameter: "Temperature", actualValue: 27.05, finalValue: 27.05 },
    { parameter: "Humidity", actualValue: 60.2, finalValue: 60.2 },
    { parameter: "Pressure", actualValue: 1012, finalValue: 1012 },
    { parameter: "Wind Speed", actualValue: 5.5, finalValue: 5.5 },
  ];
  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12 col-lg-12 text-center mt-3">
            <button className="btn btn-dark btn-lg w-25 rounded-4 fs-4" onClick={logout}>Exit Service Mode</button>
          </div>
        </div>
        <div style={{ maxHeight: "650px", overflowY: "auto" }}>
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <div className="table-responsive mt-4">
                <table className="table table-striped w-100">
                  <thead>
                    <tr>
                      <th className="bg-dark text-white fs-5 py-3">Parameter</th>
                      <th className="bg-dark text-white fs-5 py-3">Actual Value</th>
                      <th className="bg-dark text-white text-center fs-5 py-3">Offset</th>
                      <th className="bg-dark text-white fs-5 py-3">Final Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td className="fw-bold fs-5">{item.parameter}</td>
                        <td className="text-center fs-5">{item.actualValue}</td>
                        <td className="text-center fs-5">
                          <input
                            type="text"
                            className="form-control bg-dark-subtle fs-5 text-center rounded-5"
                          />
                        </td>
                        <td className="text-center fs-5">{item.finalValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-end mt-3">
                <button className="btn btn-success btn-lg mx-3">
                  <i className="fa fa-save"></i> Save
                </button>
                <button className="btn btn-info btn-lg">
                  <i className="fa fa-book"></i> Manual Reading
                </button>
              </div>
            </div>

          </div>


          <div className="row mt-4">
            <div className="col-md-12 col-lg-12">
              <div className="bg-black  rounded-4">
                <label className="py-3 text-white fs-5 fw-bold p-2">Sending data option</label>
              </div>



              <div className="input-group form-group mt-3">
                <label className=" fs-5 fw-bold mx-2 me-5 ">
                  Send To KLH Server
                </label>
                <div className="form-check form-switch ">
                  <input
                    style={{ width: "80px", height: "25px" }}
                    type="checkbox"
                    className="form-check-input toggle-switch"

                  />
                </div>
              </div>

              <div className="input-group form-group mt-3">
                <label className=" fs-5 fw-bold mx-2 me-4 ">
                  Send To WQMS Server
                </label>
                <div className="form-check form-switch">
                  <input
                    style={{ width: "80px", height: "25px" }}
                    type="checkbox"
                    className="form-check-input toggle-switch"

                  />
                </div>
              </div>

            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-12 col-lg-12">
              <div className="bg-black  rounded-4">
                <label className="py-3 text-white fs-5 fw-bold p-2">Download Data</label>
              </div>

              <div className="row mt-3">

                <div className="col-md-3 col-lg-3">
                  <div className="form-group  mx-2">
                    <label className="fs-5 fw-bold">Start date</label>
                    <input type="date" className="form-control fs-5 rounded-2"/>
                  </div>
                </div>
                <div className="col-md-3 col-lg-3">
                  <div className="form-group  mx-2">
                    <label className="fs-5 fw-bold">End date</label>
                    <input type="date" className="form-control fs-5 rounded-2"/>
                  </div>
                </div>
                <div className="col-md-3 col-lg-3">
                <div className="form-group  mx-2">
                    <label className="fs-5 fw-bold">Storage</label>
                    <input type="date" className="form-control fs-5 rounded-2"/>
                  </div>
                </div>

                <div className="col-md-3 col-lg-3 ">
                <div className="form-group mt-2 text-end">
                  <br/>
                    <button className="btn btn-light rounded-3 w-50 fw-bold fs-5">Export</button>
                </div>
                </div>

              </div>

            </div>
          </div>


        </div>

      </div>
    </>
  );
}

export default ServiceMode;

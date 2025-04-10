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

          <div className="row mt-4">
            <div className="col-md-12 col-lg-12">
                <div className="bg-black  rounded-4">
                  <label className="py-3 text-white fs-5 fw-bold p-2">Device Setting</label>
                </div>

                <div className="col-md-12 mt-3">
                  <div className="row">
                    <div className="col-md-3">
                      <label className=" fs-5 fw-bold mx-2 me-5 " style={{ color:"#000000" }}>
                        Device ID
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>

                <div className="col-md-12 mt-3">
                  <div className="row">
                    <div className="col-md-3">
                      <label className=" fs-5 fw-bold mx-2 me-5 " style={{ color:"#000000" }}>
                        Station Name
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>


                <div className="col-md-12 mt-3">
                  <div className="row">
                    <div className="col-md-3">
                      <label className=" fs-5 fw-bold mx-2 me-5 " style={{ color:"#000000" }}>
                        Latitude
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>

                <div className="col-md-12 mt-3">
                  <div className="row">
                    <div className="col-md-3">
                      <label className=" fs-5 fw-bold mx-2 me-5 " style={{ color:"#000000" }}>
                        Longitude
                      </label>
                    </div>
                    <div className="col-md-9">
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>


                <div className="text-end mt-3">
                  <button className="btn btn-success">
                    <i className="fa fa-save"></i> Save
                  </button>
                </div>

            </div>
          </div>

          <div className="row">
            <div className="col-md-12 col-lg-12">
              <div className="table-responsive mt-4">
                <table className="table table-striped w-100">
                  <thead>
                    <tr>
                      <th className="bg-black text-white fs-5 py-3">Parameter</th>
                      <th className="bg-black text-white fs-5 py-3">Actual Value</th>
                      <th className="bg-black text-white text-center fs-5 py-3">Offset</th>
                      <th className="bg-black text-white fs-5 py-3">Final Value</th>
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
                  <tfoot>
                    <tr>
                      <td className="bg-black"></td>
                      <td className="bg-black"></td>
                      <td className="bg-black"></td>
                      <td className="bg-black">
                          <div className="text-end">
                            <button className="btn btn-success  mx-2">
                              <i className="fa fa-save"></i> Save
                            </button>
                            <button className="btn btn-info">
                              <i className="fa fa-book"></i> Manual Reading
                            </button>
                          </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
                    
              
            </div>

          </div>


          <div className="row mt-4">
            <div className="col-md-12 col-lg-12">
              <div className="table-responsive mt-4">
                <table className="table table-striped w-100">
                  <thead>
                    <tr>
                      <th className="bg-black text-white fs-5 py-3">Sending data option</th>
                      <th className="bg-black  text-white text-center fs-5 py-3">Api Url</th>
                      <th className="bg-black  text-white text-center fs-5 py-3">Token Url</th>
                      <th className="bg-black  text-white fs-5 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <label className=" fs-6 fw-bold text-black ">Send To KLH Server</label>
                      </td>
                      <td>
                        <input type="text"className="form-control bg-dark-subtle rounded-5"/>
                      </td>
                      <td>
                        <input type="text"className="form-control bg-dark-subtle rounded-5"/>
                      </td>
                      <td>
                        <div className="form-check form-switch ">
                          <input style={{ width: "80px", height: "25px" }} type="checkbox" className="form-check-input toggle-switch"/>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <label className=" fs-6 fw-bold text-black ">Send To WQMS Server</label>
                      </td>
                      <td>
                        <input type="text"className="form-control bg-dark-subtle rounded-5"/>
                      </td>
                      <td>
                        <input type="text"className="form-control bg-dark-subtle rounded-5"/>
                      </td>
                      <td>
                        <div className="form-check form-switch ">
                          <input style={{ width: "80px", height: "25px" }} type="checkbox" className="form-check-input toggle-switch"/>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="bg-black"></td>
                      <td className="bg-black"></td>
                      <td className="bg-black"></td>
                      <td className="bg-black">
                          <div className="text-end">
                            <button className="btn btn-success">
                              <i className="fa fa-save"></i> Save
                            </button>
                          </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

            </div>
          </div>


          <div className="row mt-4">
            <div className="col-md-12 col-lg-12">
              <div className="table-responsive mt-4">
                <table className="table table-striped w-100">
                  <thead>
                    <tr>
                      <th className="bg-black text-white fs-5 py-3" colSpan={2}>Email Setting Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <label><b>Server</b></label>
                        <input type="text" className="form-control bg-dark-subtle rounded-2"/>
                      </td>
                      <td>
                        <label><b>Username</b></label>
                        <input type="text" className="form-control bg-dark-subtle rounded-2"/>
                      </td>
                      
                    </tr>

                    <tr>
                      <td>
                        <label><b>Port</b></label>
                        <input type="text" className="form-control bg-dark-subtle rounded-2"/>
                      </td>
                      <td>
                        <label><b>Password</b></label>
                        <input type="text" className="form-control bg-dark-subtle rounded-2"/>
                      </td>
                      
                    </tr>

                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="bg-black" colSpan={2}>
                          <div className="text-end">
                            <button className="btn btn-success">
                              <i className="fa fa-save"></i> Save
                            </button>
                          </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
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
                    <label className="fs-5 fw-bold" style={{ color:"#000000" }}>Start date</label>
                    <input type="date" className="form-control fs-5 rounded-2"/>
                  </div>
                </div>
                <div className="col-md-3 col-lg-3">
                  <div className="form-group  mx-2">
                    <label className="fs-5 fw-bold" style={{ color:"#000000" }}>End date</label>
                    <input type="date" className="form-control fs-5 rounded-2"/>
                  </div>
                </div>
                <div className="col-md-3 col-lg-3">
                <div className="form-group  mx-2">
                    <label className="fs-5 fw-bold" style={{ color:"#000000" }}>Storage</label>
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

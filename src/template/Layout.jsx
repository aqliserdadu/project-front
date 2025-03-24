import { Outlet, Link } from "react-router-dom";
import Values from "../pages/Values";
import TimeSeries from "../pages/TimeSeries";
import Service from "../componen/Service";
import Setting from "../pages/Setting";
import Help from "../pages/Help";

import wifiCon from "../assets/wifi-con.png"
import wifiDis from "../assets/wifi-dis.png"
import ethCon from "../assets/eth-con.png"
import ethDis from "../assets/eth-dis.png"



function Layout() {


    return (
        <>
            <div className="d-flex flex-column vh-100">
                <div className="flex-grow-1 d-flex">
                    <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
                        <div className="d-flex flex-column">
                            <div style={{ height: "131px", backgroundColor: "blue" }}><Link to="/">Home</Link></div>
                            <div style={{ height: "129px", backgroundColor: "black" }}><Link to="/values">Values</Link></div>
                            <div style={{ height: "129px", backgroundColor: "blue" }}><Link to="/timeSeries">Time Series</Link></div>
                            <div style={{ height: "129px", backgroundColor: "yellow" }}><Link to="/service">Service</Link></div>
                            <div style={{ height: "129px", backgroundColor: "blue" }}><Link to="/setting">Setting</Link></div>
                            <div style={{ height: "130px", backgroundColor: "black" }}><Link to="/help">Help</Link></div>
                        </div>
                    </nav>
                    <main className="col-md-9 ms-sm-auto col-lg-10">
                        <div className="row">
                            <div className="d-flex justify-content-end">
                                <div style={{ marginRight: "10px",marginTop:"5px" }} ><Link to="/wifiSet"><img src={wifiCon} alt="Logo" style={{ height: "25px" }} /></Link></div>
                                <div style={{ marginRight: "10px",marginTop:"5px" }}><Link to="/ethSet"><img src={ethDis} alt="Logo" style={{ height: "25px" }} /></Link></div>

                            </div>
                        </div>

                        <div>
                            <Outlet />
                        </div>
                        

                    </main>
                </div>
                <footer style={{backgroundColor:"blue",marginTop:"-5px"}} className="text-light">
                       <div className="row">
                        <div className="col-md-4 col-lg-4">
                            <div style={{textAlign:"left",marginLeft:"30px",display:"inline"}}>
                                DAS Citarum
                            </div>
                            <div style={{textAlign:"left",marginLeft:"100px",display:"inline"}}>
                                KLH
                            </div>  
                        </div>

                        <div className="col-md-4 col-lg-4">
                            <div className="text-center">
                                21 Maret 2025 | 11:50
                            </div>
                        </div>

                        <div className="col-md-4 col-lg-4">
                            <div style={{textAlign:"right",marginRight:"30px"}}>
                                HASLOG V.01.0
                            </div>
                        </div>
                       </div>
                        
                </footer>
            </div>
        </>
    )

}


export default Layout
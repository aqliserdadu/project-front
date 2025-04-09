import React from "react";
import apex from "../assets/Apex.webp";
import ecom from "../assets/ecom.webp";
import instantel from "../assets/instantel.webp";
import ion from "../assets/Ion.webp";
import gig from "../assets/GIG.webp";
import insitu from "../assets/in-situ.webp";
import hanger from "../assets/Hanger.webp";
import scan from "../assets/Scan-Me.png";

function Home() {
    
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-12 col-md-12">
                    <div className="row">
                        <div className="col-lg-8 col-md-8">
                           <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <p style={{ fontSize:"18px", fontWeight:"bold" }}>
                                        Embarking on our journey in 2006, HAS Environmental emerged as a beacon in Occupational Safety, Health, and Environmental Instrumentation. Our legacy spans over fruitful collaborations with industries globally. Powered by a team dedicated to innovation and customer satisfaction, we've consistently bridged the gap between quality and professionalism.
                                    </p>
                                    <div className="mt-5">
                                        <label style={{ fontSize:"25px", fontWeight:"bold" }} >Our Capabilities</label>
                                        <ul style={{ fontSize:"18px", fontWeight:"bold" }} >
                                            <li>Calibration Laboratories</li>
                                            <li>Technical Support</li>
                                            <li>Maintenance</li>
                                            <li>Training Center</li>
                                        </ul>
                                    </div>
                                    <p className="mt-3">
                                        <label style={{ fontSize:"25px", fontWeight:"bold" }} >Brands</label>
                                    </p>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                    <div className="row">
                                        <div className="col-lg-3 col-md-3">
                                            <img src={instantel} style={{ width:"100%",height:"auto" }} />
                                        </div>
                                        <div className="col-lg-3 col-md-3">
                                            <img src={ion} style={{ width:"100%",height:"auto" }} />
                                        </div>
                                        <div className="col-lg-3 col-md-3">
                                            <img src={ecom} style={{ width:"100%",height:"auto" }} />
                                        </div>
                                        <div className="col-lg-3 col-md-3">
                                            <img src={gig} style={{ width:"100%",height:"auto" }} />
                                        </div>
                                        <div className="col-lg-3 col-md-3">
                                            <img src={insitu} style={{ width:"100%",height:"auto" }} />
                                        </div>
                                        <div className="col-lg-3 col-md-3">
                                            <img src={hanger} style={{ width:"100%",height:"auto" }} />
                                        </div>
                                        <div className="col-lg-3 col-md-3">
                                            <img src={apex} style={{ width:"100%",height:"auto" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <img src={apex} style={{ width:"60%",height:"auto" }} />
                                </div>
                                <div className="col-lg-12 col-md-12">
                                    <label style={{ margin:"30px", fontSize:"20px", fontWeight:"bold"}}>For more information please scan qr code</label>
                                    <img src={scan} style={{ width:"90%",height:"auto" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;


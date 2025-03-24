import React, { useEffect, useRef } from "react";
import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale
} from "chart.js";

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

function TimeSeries() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (!chartRef.current) return;

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext("2d");
        chartInstance.current = new Chart(ctx, {
            type: "line",
            data: {
                labels: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
                datasets: [
                    {
                        label: "Suhu (°C)",
                        data: [22, 24, 26, 28, 27, 25],
                        borderColor: "rgba(75, 192, 192, 1)",
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <>
            <div className="container mx-auto">
                <div className="row">
                    <div className="col-md-2 col-lg-2">
                        <h4>PARAMETER :</h4>
                    </div>
                    <div className="col-md-4 col-lg-4">
                        <select className="form-control">
                            <option>Temperature</option>
                            <option>Suhu</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-lg-12" style={{ marginTop: "30px" }}>
                        <div className="bg-white p-4 shadow-md rounded-lg">
                            <div className="relative h-96">
                                <div className="relative" style={{ height: "550px" }}>
                                    <canvas ref={chartRef}></canvas>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <br/>
                <div className="row">
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary mx-2">HOUR</button>
                        <button className="btn btn-light" style={{marginRight:"15px"}}>DAY</button>
                    </div>
                </div>
            </div>

        </>

    );
}

export default TimeSeries;

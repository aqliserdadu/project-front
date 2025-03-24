function WifiSet() {

    return (
        <>
            <div className="container">
                <h2 className="mb-4">WiFi Tersedia</h2>
                <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        WiFi Rumah
                        <span>
                            <i className="fas fa-wifi text-success"></i>
                            <button className="btn btn-success btn-sm ms-3">Terubungkan</button>
                        </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        WiFi Kantor
                        <span>
                            <i className="fas fa-wifi text-warning"></i>
                            <button className="btn btn-primary btn-sm ms-4">Hubungkan</button>
                        </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        WiFi Tamu
                        <span>
                            <i className="fas fa-wifi text-danger"></i>
                            <button className="btn btn-primary btn-sm ms-4">Hubungkan</button>
                        </span>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default WifiSet
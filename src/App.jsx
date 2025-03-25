import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Layout from "./template/Layout";
import Home from "./pages/Home";
import Values from "./pages/Values";
import TimeSeries from "./pages/TimeSeries";
import Service from "./pages/Service";
import Setting from "./pages/Setting";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import WifiSet from "./pages/WifiSet";
import WifiDetail from "./pages/WifiDetail";
import EthSet from "./pages/EthSet";
import AddRainSensor from "./pages/AddRainSensor";
import AddSensor from "./pages/AddSensor";
import ServiceMode from "./pages/ServiceMode";
import EditSensor from "./pages/EditSensor";


function App() {


  return (
    <Router>
      <Routes> 
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="/values" element={<Values />} />
          <Route path="/timeSeries" element={<TimeSeries />} />
          <Route path="/service" element={<Service />} />
          <Route path="/serviceMode" element={<ServiceMode />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/help" element={<Help />} />
          <Route path="/wifiSet" element={<WifiSet />} />
          <Route path="/wifiDetail" element={<WifiDetail />} />
          <Route path="/ethSet" element={<EthSet />} />
          <Route path="/addrainsensor" element={<AddRainSensor />} />
          <Route path="/addsensor" element={<AddSensor />} />
          <Route path="/editsensor/:id" element={<EditSensor />} />
          <Route path="*" element={<NotFound />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App

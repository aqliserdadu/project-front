import { useNavigate } from "react-router-dom";

function ServiceLogin() {
    const navigate = useNavigate();
    return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12 col-lg-12 text-center mt-3">
            <button className="btn btn-dark btn-lg" onClick={()=>navigate(-1)}>Exit Service Mode</button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="table-responsive mt-4">
              <table style={{width:"100%"}}>
                <thead>
                  <tr style={{backgroundColor:"black",color:"white",padding:"2px"}}>
                    <th>Parameter</th>
                    <th className="text-center">Actual Value</th>
                    <th className="text-center">Offset</th>
                    <th className="text-center">Final Value</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Temperature</td>
                        <td className="text-center">27.05</td>
                        <td className="text-center"><input type="text" style={{borderRadius:"10px"}}/></td>
                        <td className="text-center">27.05</td>
                    </tr>
                    <tr>
                        <td>Pressure</td>
                        <td className="text-center">27.05</td>
                        <td className="text-center"><input type="text" style={{borderRadius:"10px"}}/></td>
                        <td className="text-center">27.05</td>
                    </tr>
                    
                    <tr>
                        <td>Depth</td>
                        <td className="text-center">27.05</td>
                        <td className="text-center"><input type="text" style={{borderRadius:"10px"}}/></td>
                        <td className="text-center">27.05</td>
                    </tr>
                    
                    <tr>
                        <td>Turbidity</td>
                        <td className="text-center">27.05</td>
                        <td className="text-center"><input type="text" style={{borderRadius:"10px"}}/></td>
                        <td className="text-center">27.05</td>
                    </tr>
                    
                    <tr>
                        <td>NH3-N</td>
                        <td className="text-center">27.05</td>
                        <td className="text-center"><input type="text" style={{borderRadius:"10px"}}/></td>
                        <td className="text-center">27.05</td>
                    </tr>
                    
                    <tr>
                        <td>COD</td>
                        <td className="text-center">27.05</td>
                        <td className="text-center"><input type="text" style={{borderRadius:"10px"}}/></td>
                        <td className="text-center">27.05</td>
                    </tr>
                    
                    
                </tbody>
              </table>
            </div>
          </div>



        </div>

        <div className="row">
            <div className="col-md-12 col-lg-12">
                <div style={{backgroundColor:"black",color:"white"}}>
                    <h5>Sending data option</h5>
                </div>
                
            </div>
        </div>


      </div>
    </>
  );
}

export default ServiceLogin;

import wifiCon from "../assets/wifi-con.png";
import wifiDis from "../assets/wifi-dis.png";
import ethCon from "../assets/eth-con.png";
import ethDis from "../assets/eth-dis.png";
function Top() {

    function tes(){
        window.alert('tes')
    }

    return (
        <>
            <div className="row">
                <div className="d-flex justify-content-end">
                    <div style={{marginRight:"10px"}} onClick={tes}><img src={wifiCon} alt="Logo" style={{height:"25px"}} /></div>
                    <div style={{marginRight:"10px"}}><img src={ethDis} alt="Logo" style={{height:"25px"}} /></div>
                   
                </div>
            </div>
        </>
    )

}

export default Top
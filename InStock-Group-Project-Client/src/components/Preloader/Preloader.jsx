import "./Preloader.scss";
import loadingAnimation from "../../assets/icons/loading-atom.gif";

function Preloader() {
    return (
        <div className="loader">
            <h5 className="loader__text">Loading...</h5>
            <img src={loadingAnimation} alt="loading.." className="loader__animation"/>
        </div>
    );
}

export default Preloader;
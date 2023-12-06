import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import arrowBack from '../../assets/icons/arrow_back-24px.svg';
import editWhite from '../../assets/icons/edit_white_24dp.svg';
import './WarehouseDetails.scss';
import Preloader from '../../components/Preloader/Preloader';

const myAPI = process.env.REACT_APP_SERVER_URL;

function WarehouseDetails() {

    const [currentWarehouse, setCurrentWarehouse] = useState(null);
    const params = useParams();

    // Get the selected warehouse from the API
    useEffect(() => {
        async function getWarehouse() {
            try {
                const warehouseResponse = await axios.get(`${myAPI}/warehouses/${params.id}`);
                setCurrentWarehouse(warehouseResponse.data);
            } catch(error) {
                console.log('Error: ', error);
            }
        }
        getWarehouse();
    }, [params.id]);

    if (!currentWarehouse) {
        return <Preloader/>;
    }

    return (
        <div className="warehouseDetails">
            <div className="warehouseDetails__header">
                <div className="warehouseDetails__title">
                    <Link to="/">
                        <img className="warehouseDetails__arrowBack-button" src={arrowBack} alt="arrowBack-button" />
                    </Link>
                    <h1 className="warehouseDetails__heading">{currentWarehouse.warehouse_name}</h1>
                </div>
                <Link to={`/warehouse/${params.id}/edit`}>
                    <div className="warehouseDetails__edit">
                        <img className="warehouseDetails__edit-button" src={editWhite} alt="edit-button" />
                        <div className="warehouseDetails__edit-text">Edit</div>
                    </div>
                </Link>
            </div>
            <div className="warehouseDetails__infoBox">
                <div className="warehouseDetails__address">
                    <div className="warehouseDetails__address-heading">WAREHOUSE ADDRESS:</div>
                    <div className="warehouseDetails__address-detail">{currentWarehouse.address}</div>
                </div>
                <div className="warehouseDetails__contact">
                    <div className="warehouseDetails__contact-name">
                        <div className="warehouseDetails__contact-name-heading">CONTACT NAME:</div>
                        <div className="warehouseDetails__contact-name-detail">{currentWarehouse.contact_name}</div>
                        <div className="warehouseDetails__contact-name-position">{currentWarehouse.contact_position}</div>
                    </div>
                    <div className="warehouseDetails__contactInfo">
                        <div className="warehouseDetails__contactInfo-heading">CONTACT INFORMATION:</div>
                        <div className="warehouseDetails__contactInfo-tel">{currentWarehouse.contact_phone}</div>
                        <div className="warehouseDetails__contactInfo-mail">{currentWarehouse.contact_email}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WarehouseDetails;
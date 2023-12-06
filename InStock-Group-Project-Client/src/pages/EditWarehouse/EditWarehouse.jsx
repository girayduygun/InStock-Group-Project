import "./EditWarehouse.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import WarehouseForm from "../../components/WarehouseForm/WarehouseForm";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import Preloader from '../../components/Preloader/Preloader';

const myAPI = process.env.REACT_APP_SERVER_URL;

function EditWarehouse() {

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
        <section className="warehouse-form">
            <div className="warehouse-form__top">
                <div className="warehouse-form__nav">
                    <Link to="/">
                        <img src={backArrow} alt="back arrow" className="warehouse-form__back-icon"/>
                    </Link>
                    <h1 className="warehouse-form__title">Edit Warehouse</h1>
                </div>
            </div>
                <WarehouseForm
                    version = "edit"
                    initialData = {currentWarehouse}
                    id = {params.id}
                />
        </section>
    );
}

export default EditWarehouse;
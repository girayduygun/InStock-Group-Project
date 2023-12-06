import "./EditInventory.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import InventoryForm from "../../components/InventoryForm/InventoryForm";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import Preloader from '../../components/Preloader/Preloader';

const myAPI = process.env.REACT_APP_SERVER_URL;

function EditInventory() {

    const [currentInventory, setCurrentInventory] = useState(null);
    const params = useParams();

    // Get the selected inventory item from the API
    useEffect(() => {
        async function getInventory() {
            try {
                const inventoryResponse = await axios.get(`${myAPI}/inventories/${params.id}`);
                console.log(inventoryResponse)
                setCurrentInventory(inventoryResponse.data);
            } catch(error) {
                console.log('Error: ', error);
            }
        }
        getInventory();
    }, [params.id]);

    if (!currentInventory) {
        return <Preloader/>;
    }

    return (
        <section className="inventory-form">
            <div className="inventory-form__top">
                <div className="inventory-form__nav">
                    <Link to="/inventory">
                        <img src={backArrow} alt="back arrow" className="inventory-form__back-icon"/>
                    </Link>
                    <h1 className="inventory-form__title">Edit Inventory</h1>
                </div>
            </div>
            <InventoryForm
                version = "edit"
                initialData = {currentInventory}
                id = {params.id}
            />
        </section>
    );
}

export default EditInventory;
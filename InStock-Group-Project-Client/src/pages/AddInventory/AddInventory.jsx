import "./AddInventory.scss";
import InventoryForm from "../../components/InventoryForm/InventoryForm";
import backArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import { Link } from "react-router-dom/dist";

function AddInventory() {

    return (
        <section className="inventory-form">
            <div className="inventory-form__top">
                <div className="inventory-form__nav">
                    <Link to="/inventory">
                        <img src={backArrowIcon} alt="back arrow" className="inventory-form__back-icon"/>
                    </Link>
                    <h1 className="inventory-form__title">Add New Inventory Item</h1>
                </div>
            </div>
            <div className="inventory-form__header inventory-form__header--alt"></div>
            <InventoryForm
                version = "add"
                initialData = {null}
                id=""
            />
        </section>
    );
}

export default AddInventory;
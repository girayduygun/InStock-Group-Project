import "./AddWarehouse.scss";
import WarehouseForm from "../../components/WarehouseForm/WarehouseForm";
import backArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import { Link } from "react-router-dom/dist";

function AddWarehouse() {

    return (
        <section className="warehouse-form">
            <div className="warehouse-form__top">
                <div className="warehouse-form__nav">
                    <Link to="/">
                        <img src={backArrowIcon} alt="back arrow" className="warehouse-form__back-icon"/>
                    </Link>
                    <h1 className="warehouse-form__title">Add New Warehouse</h1>
                </div>
            </div>
            <div className="warehouse-form__header warehouse-form__header--alt"></div>
            <div className="add__form">
            <WarehouseForm
                version = "add"
                initialData = {null}
                id = ""
            />
            </div>
        </section>
    );
}

export default AddWarehouse;
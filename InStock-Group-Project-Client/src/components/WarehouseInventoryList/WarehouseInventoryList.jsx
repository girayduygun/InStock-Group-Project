import { Link } from "react-router-dom";
import deleteButton from '../../assets/icons/delete_outline-24px.svg';
import edit from '../../assets/icons/edit-24px.svg';
import chevronRight from '../../assets/icons/chevron_right-24px.svg';
import './WarehouseInventoryList.scss';



function WarehouseInventoryList() {
    return (
        <div className="warehouseInventoryList">
            <div className="warehouseInventoryList__container">
                <div className="warehouseInventoryList__details">
                    <div className="warehouseInventoryList__item">
                        <div className="warehouseInventoryList__heading"><h4 className="warehouseInventoryList__title">INVENTORY ITEM</h4></div>
                        <div className="warehouseInventoryList__item-detail">
                            <h3 className="warehouseInventoryList__item-text">inventory item link</h3>
                            <img className="warehouseInventoryList__item-chevron" src={chevronRight} alt="Chevron Right Button"/>
                        </div>
                    </div>
                    <div className="warehouseInventoryList__category">
                        <div className="warehouseInventoryList__heading"><h4 className="warehouseInventoryList__title">CATEGORY</h4></div>
                        <div className="warehouseInventoryList__category-detail"><p className="warehouseInventoryList__text">ITEM NAME</p></div>
                    </div>
                </div>
                <div className="warehouseInventoryList__details">
                    <div className="warehouseInventoryList__status">
                        <div className="warehouseInventoryList__heading"><h4 className="warehouseInventoryList__title">STATUS</h4></div>
                        <div className="warehouseInventoryList__status-detail"><h4 className="warehouseInventoryList__status-text">IN STOCK</h4></div>
                    </div>
                    <div className="warehouseInventoryList__qty">
                        <div className="warehouseInventoryList__heading"><h4 className="warehouseInventoryList__title">QTY</h4></div>
                        <div className="warehouseInventoryList__qty-detail"><p className="warehouseInventoryList__text">CATEGORY QTY</p></div>
                    </div>
                </div>
            </div>
            <div className="warehouseInventoryList__buttons">
                <button type="button" className="warehouseInventoryList__delete">
                    <img src={deleteButton} alt="Delete Button"/>
                </button>
                <button type="button" className="warehouseInventoryList__edit">
                    <img src={edit} alt="Edit Button"/>
                </button>
            </div>
        </div>
    );
};

export default WarehouseInventoryList;
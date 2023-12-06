import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./InventoryListTile.scss";
import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
import editIcon from '../../assets/icons/edit-24px.svg';
import chevronIcon from '../../assets/icons/chevron_right-24px.svg';
import DeleteInventory from '../../components/DeleteInventory/DeleteInventory';
import Preloader from '../../components/Preloader/Preloader';

const myAPI = process.env.REACT_APP_SERVER_URL;


const InventoryListTile = () => {
  
  const [currentInventory, setCurrentInventory] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [inventoryList, setInventoryList] = useState([]);
  
  useEffect(() => {
    // Fetch initial data when the component mounts
    const fetchInventories = async () => {
      try {
        const response = await axios.get(`${myAPI}/inventories`);
        setInventoryList(response.data);
      } catch (err) {
        console.log(`there was the following error: ${err}`);
      }
    };

    fetchInventories();
  }, []);

  if (!inventoryList) {
    return <Preloader/>;
  }

  const incrementCurrentInventory = (index) => {
    setCurrentInventory(index);
  }

  const deleteInventory = async (id) => {
    try {
      await axios.delete(`${myAPI}/inventories/${id}`);
      const getInventoryList= await axios.get(`${myAPI}/inventories`);
      setInventoryList(getInventoryList.data);
    } catch (error) {
        console.error(`Error deleting inventory item: ${error}`);
    }
  }

    return (
        <ul className="inventory__list">
        {inventoryList.map((item, index) => (
            <li className="inventory__list-item" key={item.id}>
              <div className="inventory__item-content">
                <div className="inventory__label-wrap inventory__item-name">
                  <Link
                    to={`/inventory/${item.id}`}
                    className="inventory__link"
                  >
                    <p className="inventory__name">
                      {item.item_name}
                      <img
                        src={chevronIcon}
                        alt="chevron icon"
                        className="inventory__name-icon"
                      />
                    </p>
                  </Link>
                </div>
                <div className="inventory__label-wrap inventory__item-category">
                  <p className="inventory__category">{item.category}</p>
                </div>
                <div className="inventory__label-wrap inventory__item-status">
                  <p
                    className={
                      "inventory__status " +
                      (item.status === "In Stock"
                        ? "inventory__status--instock"
                        : "inventory__status--outstock")
                    }
                  >
                    {item.status.toUpperCase()}
                  </p>
                </div>
                <div className="inventory__label-wrap inventory__item-quantity">
                  <p className="inventory__quantity">{item.quantity}</p>
                </div>
                <div className="inventory__label-wrap inventory__item-warehouse">
                  <p className="inventory__warehouse">{item.warehouse_name}</p>
                </div>
                  <div className="inventory__label-wrap inventory__actions-functions">
                    <div className="inventory__delete" onClick={() => {setOpenModal(true); incrementCurrentInventory(index);}}>
                      <img src={deleteIcon} alt="delete icon" />
                    </div>
                    <Link to={`/inventory/${item.id}/edit`}>
                      <img
                        src={editIcon}
                        alt="edit icon"
                        className="inventory__edit"
                      />
                    </Link>
                  </div>
                  {openModal && (
                       <DeleteInventory
                           closeModal={() => setOpenModal(false)}
                           inventoryModal={inventoryList[currentInventory]}
                           handleDelete={deleteInventory}
                       />
                  )}
              </div>
            </li>
          ))}
        </ul> 
    );
};


export default InventoryListTile;
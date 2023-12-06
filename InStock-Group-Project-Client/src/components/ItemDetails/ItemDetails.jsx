import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ItemDetails.scss';
import Preloader from '../../components/Preloader/Preloader';

const myAPI = process.env.REACT_APP_SERVER_URL;

const ItemDetails = () => {
    const { id } = useParams();
    const [inventory, setInventory] = useState({ id: null });
    
        useEffect(() => { 
            async function fetchInventoryItem() {
            try {
                const response = await axios.get(`${myAPI}/inventories/${id}`);
                console.log(response)
                setInventory(response.data);
              } catch (err) {
                console.log(`${myAPI}/inventories`)
                console.log(`there was the following error: ${err}`);
              }
            }
              fetchInventoryItem(); // Call the fetchData function to fetch data when the component mounts
          }, []);
     
      
        if (!inventory.id) {
          return <Preloader/>;
        }
      
    return (
    <>
      <hr className="details-break" />

      <div className="inv-details">
        <div className="inv-details__left-container">
          <div className="inv-details__description">
            <h5 className="inv-details__label">ITEM DESCRIPTION:</h5>
            <p className="inv-details__txt inv-details__des-txt">{inventory.description}</p>
          </div>
          <div className="inv-details__cat-container">
            <h5 className="inv-details__label">CATEGORY:</h5>
            <p className="inv-details__txt">{inventory.category}</p>
          </div>
        </div>
        <div className="inv-details__vl"></div>
        <div className="inv-details__right-container">
          <div className="inv-details__tablet-right">
            <div className="inv-details__status">
              <h5 className="inv-details__label">STATUS:</h5>
              <p className="inv-details__status-txt">{inventory.status}</p>
            </div>
            <div className="inv-details__qty">
              <h5 className="inv-details__label">QUANTITY:</h5>
              <p className="inv-details__txt">{inventory.quantity}</p>
            </div>
          </div>
          <div className="inv-details__warehouse">
            <h5 className="inv-details__label">WAREHOUSE:</h5>
            <p className="inv-details__txt">{inventory.warehouse_name}</p>
          </div>
        </div>
      </div>
    </>
    );
};


export default ItemDetails;









import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import backArrow from '../../assets/icons/arrow_back-24px.svg';
import editWhite from '../../assets/icons/edit_white_24dp.svg';
import './ItemDetailsHeader.scss';
import Preloader from '../../components/Preloader/Preloader';

const myAPI = process.env.REACT_APP_SERVER_URL;

const ItemDetailsHeader = () => {
    const { id } = useParams();
    const [inventory, setInventory] = useState({ id: null });
    
        useEffect(() => { 
            async function fetchInventoryItem() {
            try {
                const response = await axios.get(`${myAPI}/inventories/${id}`);
                setInventory(response.data);
              } catch (err) {
                console.log(`${myAPI}/inventory`)
                console.log(`there was the following error: ${err}`);
              }
            }
              fetchInventoryItem(); // Call the fetchData function to fetch data when the component mounts
          }, []);

      
        if (!inventory.id) {
          return <Preloader/>;
        }
      

    return (
      
      <div className="inv-header">
        <div className="inv-header__left-container">
          <Link to="/inventory">
            <img className="inv-header__arrow" src={backArrow} alt="" />
          </Link>
          <h1 className="inv-header__title">{inventory.item_name}</h1>
        </div>
        <div className="inv-header__right-container">
          <div className="inv-header__edit-button">
            <Link className="inv-header__link" to={`/inventory/${inventory.id}/edit`}>
              <h3 className="inv-header__text">Edit</h3>
              <img className="inv-header__icon" src={editWhite} alt="edit icon" />
            </Link>
          </div>
        </div>
      </div>
    
    );
};

export default ItemDetailsHeader;
import './WarehouseListTile.scss';
import arrowRight from '../../assets/icons/chevron_right-24px.svg';
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DeleteWarehouse from '../DeleteWarehouse/DeleteWarehouse';


const myAPI = process.env.REACT_APP_SERVER_URL;


const WarehouseListTile = () => {
   // fetch warehouse data
   const [warehouseData, setWarehouseData] = useState([]);
    //    Set current warehouse for modal
   const [currentWarehouse, setCurrentWarehouse] = useState(0);
    // View state for modal   
   const [openModal, setOpenModal] = useState(false);


   useEffect(() => {
       const fetchWarehouses = async () => {
           try {
               const getWarehouseResponse = await axios.get(`${myAPI}/warehouses`);
               if (getWarehouseResponse.data) {
                   setWarehouseData(getWarehouseResponse.data);
               }
           } catch(err) {
               console.log(`there was the following error: ${err}`)
           }
       }


       fetchWarehouses();
   }, []);


   const incrementCurrentWarehouse = (index) => {
       setCurrentWarehouse(index);
   };


   const deleteWarehouse = async (id) => {
       try {
           await axios.delete(`${myAPI}/warehouses/${id}`);
           const getWarehouseResponse = await axios.get(`${myAPI}/warehouses`);
           setWarehouseData(getWarehouseResponse.data);
       } catch (error) {
           console.error(`Error deleting warehouse: ${error}`);
       }
   };


   return (
       <section className="warehouses">
           {warehouseData.map((warehouse, index) => (
               <div className="warehouses__tile" key={warehouse.id}>
                   <Link to={`/warehouse/${warehouse.id}`}>
                       <div className="warehouses__column column__one">
                           <p className="warehouses__label">warehouse</p>
                           <span className='warehouses__link'>{warehouse.warehouse_name} <img src={arrowRight} alt="right arrow icon" className='warehouse__icon'/></span>
                       </div>
                   </Link>
                   <div className="warehouses__column column__two">
                       <p className="warehouses__label">address</p>
                       <p className="warehouses__data">{warehouse.address}</p>
                       <p className="warehouses__data">{warehouse.city}, {warehouse.country}</p>
                   </div>
                   <div className="warehouses__column column__three">
                       <p className="warehouses__label">contact name</p>
                       <p className="warehouses__data">{warehouse.contact_name}</p>
                   </div>
                   <div className="warehouses__column column__four">
                       <p className="warehouses__label">contact information</p>
                       <p className="warehouses__data">{warehouse.contact_phone}</p>
                       <p className="warehouses__data">{warehouse.contact_email}</p>
                   </div>
                   <div className="warehouses__column column__five">
                       <img src={deleteIcon} onClick={() => {setOpenModal(true); incrementCurrentWarehouse(index);}} alt="delete warehouse icon" className="warehouses__delete warehouses__icon" />
                       <Link to={`/warehouse/${warehouse.id}/edit`}><img src={editIcon} className="warehouses__edit warehouses__icon" /></Link>
                   </div>
                   {openModal && (
                       <DeleteWarehouse
                           closeModal={() => setOpenModal(false)}
                           warehouseModal={warehouseData[currentWarehouse]}
                           handleDelete={deleteWarehouse}
                       />
                   )}
               </div>
           ))}
       </section>
   );
};


export default WarehouseListTile;
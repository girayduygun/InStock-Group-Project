import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Preloader from '../../components/Preloader/Preloader';

const myAPI = process.env.REACT_APP_SERVER_URL;

function InventoryForm({ version, initialData, id }) {

  if (!initialData) {
    initialData = {
      item_name: "",
      description: "",
      category: "",
      status: "In Stock",
      quantity: 0,
      warehouse_id: ""
    }
  }

  const [ itemName, setItemName ] = useState(initialData.item_name);
  const [ itemDescription, setItemDescription ] = useState(initialData.description);
  const [ itemCategory, setItemCategory ] = useState(initialData.category);
  const [ status, setStatus ] = useState(initialData.status);
  const [ itemQuantity, setItemQuantity ] = useState(initialData.quantity);
  const [ itemWarehouse, setItemWarehouse ] = useState(initialData.warehouse_id);
  const [ categories, setCategories ] = useState(null);
  const [ warehouses, setWarehouses ] = useState(null);
  const navigator = useNavigate();

  // Fill in the dropdowns with item categories and warehouses from the database
  useEffect(() => {
      async function getDropdownData() {
          try {
            // Get item categories, assign keys as well
            const categoryResponse = await axios.get(`${myAPI}/categories`);
            let categoryID = 0;
            const categoryData = categoryResponse.data.map((category) => { 
              category.id = categoryID;
              categoryID++;
              return category;
            });
            setCategories(categoryData);
            // Get warehouses
            const warehouseResponse = await axios.get(`${myAPI}/warehouses`);
            setWarehouses(warehouseResponse.data);
          } catch(error) {
            console.log('Error: ', error);
          }
      }
      getDropdownData();
  }, []);

  const initialStateObj = {
    itemName: 0,
    itemDescription: 0,
    itemCategory: 0,
    itemQuantity: 0,
    itemWarehouse: 0
  };
  const [ initialStateFlag, setInitialStateFlag ] = useState(initialStateObj);

  // Keep track of the whether the field has been changed
  function isFieldFilled(field, stateFlag) {
    if (!field && stateFlag === 1) {
      return false;
    }
    return true;
  }

  function isQuantityValid(inputValue) {
    if (!(isNaN(parseInt(inputValue)))) {
      return true;
    }
    return false;
  }

  function isFormValid() {
    const approvalFlag = (!(
      itemName &&
      itemDescription &&
      itemCategory &&
      itemWarehouse
    ));
    if (approvalFlag) {
      return false;
    }
    if (status === "Out of Stock") {
      setItemQuantity(0);
      return true;
    }
    if (isQuantityValid(itemQuantity) && parseInt(itemQuantity) === 0) {
      setStatus("Out of Stock");
      return true;
    }
    if (isQuantityValid(itemQuantity)) {
      return true;
    }
    return false;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (isFormValid()) {
      updateInventory();
      navigator("/inventory");
    } else {
      const newStateObj = {
        itemName: 1,
        itemDescription: 1,
        itemCategory: 1,
        itemQuantity: 1,
        itemWarehouse: 1
      };
      setInitialStateFlag(newStateObj);
    }
  }

  async function updateInventory() {
    try {
      const inventoryObj = {
        itemName: itemName,
        itemDescription: itemDescription,
        itemCategory: itemCategory,
        itemAvailability: status,
        itemQuantity: itemQuantity,
        itemWarehouseID: itemWarehouse
      }
      console.log(inventoryObj)
      if (version === "add") {
        await axios.post(`${myAPI}/inventories`, inventoryObj);
      } else {
        await axios.put(`${myAPI}/inventories/${id}`, inventoryObj);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  if (!categories || !warehouses) {
      return <Preloader/>;
  }

  return (
    <form action="submit" className="form" onSubmit={handleSubmit}>
      <div className="form__column">
        <h3 className="form__subtitle">Item Details</h3>
        <div className="form__input-wrapper">
          <label htmlFor="item-name" className="form__label">
            Item Name
          </label>
          <input
            type="text"
            name="item-name"
            className={`form__input-text ${
              isFieldFilled(itemName, initialStateFlag.itemName) ? "" : "form__input-text--invalid"
            }`}
            placeholder="Item Name"
            onChange={(event) => {
              setItemName(event.target.value);
              initialStateFlag.itemName = 1;
              setInitialStateFlag(initialStateFlag);
            }}
            value={itemName}
          />
        </div>
        <div className="form__input-wrapper">
          <label htmlFor="item-description" className="form__label">
            Description
          </label>
          <textarea
            type="text"
            name="item-description"
            className={`form__input-textarea ${
              isFieldFilled(itemDescription, initialStateFlag.itemDescription) ? "" : "form__input-textarea--invalid"
            }`}
            placeholder="Please enter a brief item description..."
            onChange={(event) => {
              setItemDescription(event.target.value);
              initialStateFlag.itemDescription = 1;
              setInitialStateFlag(initialStateFlag);
            }}
            value={itemDescription}
          />
        </div>
        <div className="form__input-wrapper">
          <label htmlFor="item-category" className="form__label">
            Category
          </label>
          <select
            name="item-category"
            className={`form__input-select ${
              isFieldFilled(itemCategory, initialStateFlag.itemCategory) ? "" : "form__input-select--invalid"
            }`}
            onChange={(event) => {
              setItemCategory(event.target.value);
              initialStateFlag.itemCategory = 1;
              setInitialStateFlag(initialStateFlag);
            }}
            value={itemCategory}
          >
            <option value="" className="form__input-option--default">Please select</option>
            {categories.map( (category) => {
              return (<option value={category.category} className="form__input-option" key={category.id}>{category.category}</option>);
            })}
          </select>
        </div>
      </div>
      <div className="form__column form__column--last">
        <h3 className="form__subtitle">Item Availability</h3>
        <div className="form__input-wrapper">
          <label htmlFor="status" className="form__label">
            Status
          </label>
          <div className="form__radio-section">
            <div className="form__radio-item">
              <input
                type="radio"
                name="status"
                className="form__input-radio"
                onChange={() => { setStatus("In Stock"); }}
                value={"In Stock"}
                checked={status === "In Stock"}
              />
              <label htmlFor="In stock" className="form__radio-label">In stock</label>
            </div>
            <div className="form__radio-item">
              <input
                type="radio"
                name="status"
                className="form__input-radio"
                onChange={() => {
                  setStatus("Out of Stock");
                  setItemQuantity(0);
                }}
                value={"Out of Stock"}
                checked={status === "Out of Stock"}
              />
              <label htmlFor="Out of stock" className="form__radio-label">Out of stock</label>
            </div>
          </div>
        </div>
        <div
          className={`form__input-wrapper ${
            (status === "In Stock") ? "" : "hidden"
          }`}
        >
          <label htmlFor="quantity" className="form__label">
            Quantity
          </label>
          <input
            type="text"
            name="quantity"
            className={`form__input-text ${
              (isFieldFilled(itemQuantity, initialStateFlag.itemQuantity) && !(itemQuantity === "0")) ? "" : "form__input-text--invalid"
            }`}
            onChange={(event) => {
              if (event.target.value === "") {
                setItemQuantity("");
              } else if (isQuantityValid(event.target.value)) {
                setItemQuantity(parseInt(event.target.value));
              } else {
                setItemQuantity(itemQuantity);
              }
              initialStateFlag.itemQuantity = 1;
              setInitialStateFlag(initialStateFlag);
            }}
            value={itemQuantity}
          />
        </div>
        <div className="form__input-wrapper">
          <label htmlFor="item-warehouse" className="form__label">
            Warehouse
          </label>
          <select
            name="item-warehouse"
            className={`form__input-select ${
              isFieldFilled(itemWarehouse, initialStateFlag.itemWarehouse) ? "" : "form__input-select--invalid"
            }`}
            onChange={(event) => {
              setItemWarehouse(event.target.value);
              initialStateFlag.itemWarehouse = 1;
              setInitialStateFlag(initialStateFlag);
            }}
            value={itemWarehouse}
          >
            <option value="" className="form__input-option--default">Please select</option>
            {warehouses.map( (warehouse) => {
              return <option value={warehouse.id} className="form__input-option" key={warehouse.id}>{warehouse.warehouse_name}</option>
            })}
          </select>
        </div>
      </div>
      <div className="form__bottom">
        <Link to="/inventory">
          <button className="form__button button-cancel button--alt">Cancel</button>
        </Link>
        <button type="submit" className="form__button button-add">
          {version === "add" ? "+ Add Item" : "Save"}
        </button>
      </div>
    </form>
  );
}

export default InventoryForm;
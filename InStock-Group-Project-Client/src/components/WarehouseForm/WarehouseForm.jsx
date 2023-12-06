import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import validator from "validator";
import { isPossiblePhoneNumber, formatIncompletePhoneNumber } from "libphonenumber-js";

const myAPI = process.env.REACT_APP_SERVER_URL;

function WarehouseForm({ version, initialData, id }) {

  if (!initialData) {
    initialData = {
      warehouse_name: "",
      address: "",
      city: "",
      country: "",
      contact_name: "",
      contact_position: "",
      contact_phone: "",
      contact_email: ""
    }
  }

  const [ warehouseName, setWarehouseName ] = useState(initialData.warehouse_name);
  const [ warehouseAddress, setWarehouseAddress ] = useState(initialData.address);
  const [ warehouseCity, setWarehouseCity ] = useState(initialData.city);
  const [ warehouseCountry, setWarehouseCountry ] = useState(initialData.country);
  const [ contactName, setContactName ] = useState(initialData.contact_name);
  const [ contactPosition, setContactPosition ] = useState(initialData.contact_position);
  const [ contactNumber, setContactNumber ] = useState(initialData.contact_phone);
  const [ contactEmail, setContactEmail ] = useState(initialData.contact_email);
  const navigator = useNavigate();

  const initialStateObj = {
    warehouseName: 0,
    warehouseAddress: 0,
    warehouseCity: 0,
    warehouseCountry: 0,
    contactName: 0,
    contactPosition: 0,
    contactNumber: 0,
    contactEmail: 0
  };
  const [ initialStateFlag, setInitialStateFlag ] = useState(initialStateObj);

  // Keep track of the whether the field has been changed
  function isFieldFilled(field, stateFlag) {
    if (!field && stateFlag === 1) {
      return false;
    }
    return true;
  }

  function isPhoneNumberValid() {
    // Use libraries to check that the format of the input is valid
    if (isPossiblePhoneNumber(contactNumber) || validator.isMobilePhone(contactNumber)) {
      return true;
    }
    return false;
  }

  function isEmailValid() {
    // Use a library to check that the format of the input is valid
    if (validator.isEmail(contactEmail)) {
      return true;
    }
    return false;
  }

  function isFormValid() {
    const approvalFlag = (!(
      warehouseName &&
      warehouseAddress &&
      warehouseCity &&
      warehouseCountry && 
      contactName &&
      contactPosition &&
      contactNumber &&
      contactEmail
    ));
    if (approvalFlag) {
      return false;
    }
    if (isEmailValid() && isPhoneNumberValid()) {
      return true;
    }
    return false;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (isFormValid()) {
      updateWarehouses();
      navigator("/");
    } else {
      const newStateObj = {
        warehouseName: 1,
        warehouseAddress: 1,
        warehouseCity: 1,
        warehouseCountry: 1,
        contactName: 1,
        contactPosition: 1,
        contactNumber: 1,
        contactEmail: 1
      };
      setInitialStateFlag(newStateObj);
    }
  }

  async function updateWarehouses() {
    try {
      const warehouseObj = {
        warehouseName: warehouseName,
        warehouseAddress: warehouseAddress,
        warehouseCity: warehouseCity,
        warehouseCountry: warehouseCountry,
        contactName: contactName,
        contactPosition: contactPosition,
        contactNumber: contactNumber,
        contactEmail: contactEmail
      }

      if (version === "add") {
        await axios.post(`${myAPI}/warehouses`, warehouseObj);
      } else {
        await axios.put(`${myAPI}/warehouses/${id}`, warehouseObj);
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <form action="submit" className="form warehouse__form__body" onSubmit={handleSubmit}>
      <div className="form__column form__column-1">
        <h3 className="form__subtitle">Warehouse Details</h3>
        <div className="form__input-wrapper">
          <label htmlFor="warehouse-name" className="form__label">
            Warehouse Name
          </label>
          <input
            type="text"
            name="warehouse-name"
            className={`form__input-text ${
              isFieldFilled(warehouseName, initialStateFlag.warehouseName) ? "" : "form__input-text--invalid"
            }`}
            placeholder="Warehouse Name"
            onChange={(event) => {
              setWarehouseName(event.target.value);
              initialStateFlag.warehouseName = 1;
              setInitialStateFlag(initialStateFlag);
            }}
            value={warehouseName}
          />
        </div>
        <div className="form__input-wrapper">
          <label htmlFor="warehouse-address" className="form__label">
            Street Address
          </label>
          <input
            type="text"
            name="warehouse-address"
            className={`form__input-text ${
              isFieldFilled(warehouseAddress, initialStateFlag.warehouseAddress) ? "" : "form__input-text--invalid"
            }`}
            placeholder="Street Address"
            onChange={(event) => {
              setWarehouseAddress(event.target.value);
              initialStateFlag.warehouseAddress = 1;
              setInitialStateFlag(initialStateFlag);
            }}
            value={warehouseAddress}
          />
        </div>
        <div className="form__input-wrapper">
          <label htmlFor="warehouse-city" className="form__label">
            City
          </label>
          <input
            type="text"
            name="warehouse-city"
            className={`form__input-text ${
              isFieldFilled(warehouseCity, initialStateFlag.warehouseCity) ? "" : "form__input-text--invalid"
            }`}
            placeholder="City"
            onChange={(event) => {
              setWarehouseCity(event.target.value);
              initialStateFlag.warehouseCity = 1;
              setInitialStateFlag(initialStateFlag);
            }}
            value={warehouseCity}
          />
        </div>
        <div className="form__input-wrapper">
          <label htmlFor="warehouse-country" className="form__label">
            Country
          </label>
          <input
            type="text"
            name="warehouse-country"
            className={`form__input-text ${
              isFieldFilled(warehouseCountry, initialStateFlag.warehouseCountry) ? "" : "form__input-text--invalid"
            }`}
            placeholder="Country"
            onChange={(event) => {
              setWarehouseCountry(event.target.value);
              initialStateFlag.warehouseCountry = 1;
              setInitialStateFlag(initialStateFlag);
            }}
            value={warehouseCountry}
          />
        </div>
      </div>
      <div className="form__column form__column--last">
        <h3 className="form__subtitle">Contact Details</h3>
        <div className="form__input-wrapper">
          <label htmlFor="contact-name" className="form__label">
            Contact Name
          </label>
          <input
            type="text"
            name="contact-name"
            className={`form__input-text ${
              isFieldFilled(contactName, initialStateFlag.contactName) ? "" : "form__input-text--invalid"
            }`}
            placeholder="Contact Name"
            onChange={(event) => {
              setContactName(event.target.value);
              initialStateFlag.contactName = 1;
              setInitialStateFlag(initialStateFlag);
            }}
            value={contactName}
          />
        </div>
        <div className="form__input-wrapper">
          <label htmlFor="contact-position" className="form__label">
            Position
          </label>
          <input
            type="text"
            name="contact-position"
            className={`form__input-text ${
              isFieldFilled(contactPosition, initialStateFlag.contactPosition) ? "" : "form__input-text--invalid"
            }`}
            placeholder="Position"
            onChange={(event) => {
              setContactPosition(event.target.value);
              initialStateFlag.contactPosition = 1;
              setInitialStateFlag(initialStateFlag);
            }}
            value={contactPosition}
          />
        </div>
        <div className="form__input-wrapper">
          <label htmlFor="contact-number" className="form__label">
            Phone Number
          </label>
          <input
            type="text"
            name="contact-number"
            className={`form__input-text ${
              (isFieldFilled(contactNumber, initialStateFlag.contactNumber) && (isPhoneNumberValid() || initialStateFlag.contactNumber === 0)) ? "" : "form__input-text--invalid"
            }`}
            placeholder="Phone Number"
            onChange={(event) => {
              // setContactNumber(new AsYouType('US').input(event.target.value));
              setContactNumber(formatIncompletePhoneNumber(event.target.value, { defaultCountry: "US" }));
              initialStateFlag.contactNumber = 1;
              setInitialStateFlag(initialStateFlag);
            }}
            value={contactNumber}
          />
        </div>
        <div className="form__input-wrapper">
          <label htmlFor="contact-email" className="form__label">
            Email
          </label>
          <input
            type="text"
            name="contact-email"
            className={`form__input-text ${
              (isFieldFilled(contactEmail, initialStateFlag.contactEmail) && (isEmailValid() || initialStateFlag.contactEmail === 0)) ? "" : "form__input-text--invalid"
            }`}
            placeholder="Email"
            onChange={(event) => {
              setContactEmail(event.target.value);
              initialStateFlag.contactEmail = 1;
              setInitialStateFlag(initialStateFlag);
            }}
            value={contactEmail}
          />
        </div>
      </div>
      <div className="form__bottom">
        <Link to="/">
          <button className="form__button button button--alt form__button-cancel">Cancel</button>
        </Link>
        <button type="submit" className="form__button button form__button-add">
          {version === "add" ? "+ Add Warehouse" : "Save"}
        </button>
      </div>
    </form>
  );
}

export default WarehouseForm;
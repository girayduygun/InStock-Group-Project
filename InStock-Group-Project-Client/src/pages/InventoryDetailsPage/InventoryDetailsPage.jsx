import React from 'react';
import ItemDetailsHeader from '../../components/ItemDetailsHeader/ItemDetailsHeader';
import ItemDetails from '../../components/ItemDetails/ItemDetails';
import './InventoryDetailsPage.scss'

const InventoryDetailsPage = () => {
    return (
        <>
            <div className="inv-header-background"></div>
            <div className="inv-details-container">
                <ItemDetailsHeader/>
                <ItemDetails/>
            </div>
        </>
        
    );
};

export default InventoryDetailsPage;
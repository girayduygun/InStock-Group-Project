import './Header.scss';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/logos/InStock-Logo_1x.png';

const Header = () => {

    const { pathname } = useLocation();

    // Check if on a warehouse page
    function isOnWarehouse() {
        const isThisActive = pathname.startsWith("/warehouse")  || pathname === "/";
        return (isThisActive ? "header__nav-item--active" : "");
    }

    // Check if on an inventory page
    function isOnInventory() {
        const isThisActive = pathname.startsWith("/inventory");
        return (isThisActive ? "header__nav-item--active" : "");
    }

    return (
        <header className="header">
            <NavLink to="/">
                <img className="header__logo" src={logo} alt='InStock logo'/>
            </NavLink>
            <nav className="header__nav">
                <NavLink to="/">
                    <li className={`header__nav-item ${isOnWarehouse()}`}>Warehouse</li>
                </NavLink>
                <NavLink to="/inventory">
                    <li className={`header__nav-item ${isOnInventory()}`}>Inventory</li>
                </NavLink>
            </nav>
        </header>
    );
};

export default Header;
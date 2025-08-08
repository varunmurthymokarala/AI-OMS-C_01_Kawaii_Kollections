import React, { useContext, useState } from 'react'
import './Navbar.css'; // Assuming you have a CSS file for styling
import logo from '../Assets/logo1.png'; // Adjust the path as necessary
import cart_icon from '../Assets/cart_icon.png'; // Adjust the path as necessary
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {

    const [menu, setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);

  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>Kawaii Kollections</p>
        </div>
        <ul className="nav-menu">
            <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration: 'none'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("mens")}} style={{ position: 'relative' }}><Link style={{textDecoration: 'none'}} to='/mens'>Men</Link>{menu==="mens"?<hr/>:<></>}
                <ul className='nav-menu-submenu'>
                    <li><Link to="/mens/shirts" style={{textDecoration: 'none', color: 'brown'}}>Shirts</Link></li>
                    <li><Link to="/mens/pants" style={{textDecoration: 'none', color: 'brown'}}>Pants</Link></li>
                    <li><Link to="/mens/footwear" style={{textDecoration: 'none', color: 'brown'}}>Footwear</Link></li>
                    <li><Link to="/mens/perfumes" style={{textDecoration: 'none', color: 'brown'}}>Perfumes</Link></li>
                </ul>
            </li>
            <li onClick={()=>{setMenu("womens")}} style={{ position: 'relative' }} ><Link style={{textDecoration: 'none'}} to='/womens'>Women</Link>{menu==="womens"?<hr/>:<></>}
                <ul className='nav-menu-submenu'>
                    <li><Link to="/womens/jewels" style={{textDecoration: 'none', color: 'brown'}}>Jewels</Link></li>
                    <li><Link to="/womens/perfumes" style={{textDecoration: 'none', color: 'brown'}}>Perfumes</Link></li>
                    <li><Link to="/womens/footwear" style={{textDecoration: 'none', color: 'brown'}}>Footwear</Link></li>
                    <li><Link to="/womens/tops" style={{textDecoration: 'none', color: 'brown'}}>Tops</Link></li>
                    <li><Link to="/womens/handbags" style={{textDecoration: 'none', color: 'brown'}}>HandBags</Link></li>
                </ul>
            </li>
            <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration: 'none'}} to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
            <Link style={{textDecoration: 'none'}} to='/login'><button>Login</button></Link>
            <Link style={{textDecoration: 'none'}} to='/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}

export default Navbar
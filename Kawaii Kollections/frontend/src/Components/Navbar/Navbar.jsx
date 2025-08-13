// src/Components/Navbar/Navbar.jsx
import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo1.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import SearchBox from '../Search/Searchbox'

const Navbar = () => {
  const [menu, setMenu] = useState('shop')
  const { getTotalCartItems } = useContext(ShopContext)

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <li className="nav-logo-title" onClick={() => setMenu('KawaiiKollections')}>
          <Link to="/">Kawaii Kollections</Link>
        </li>
      </div>

      <SearchBox />

      <ul className="nav-menu">
        <li onClick={() => setMenu('shop')}>
          <Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>
          {menu === 'shop' ? <hr /> : null}
        </li>

        <li onClick={() => setMenu('toys')} style={{ position: 'relative' }}>
          <Link style={{ textDecoration: 'none' }} to='/toys'>Toys</Link>
          {menu === 'toys' ? <hr /> : null}
          <ul className='nav-menu-submenu'>
            <li><Link to="/toys/plushies" style={{ textDecoration: 'none', color: 'brown' }}>Plushies</Link></li>
            <li><Link to="/toys/blackBoxes" style={{ textDecoration: 'none', color: 'brown' }}>BlackBoxes</Link></li>
            <li><Link to="/toys/puzzels" style={{ textDecoration: 'none', color: 'brown' }}>Puzzels</Link></li>
            <li><Link to="/toys/electronictoys" style={{ textDecoration: 'none', color: 'brown' }}>Electronic Toys</Link></li>
          </ul>
        </li>

        <li onClick={() => setMenu('accesories')} style={{ position: 'relative' }}>
          <Link style={{ textDecoration: 'none' }} to='/accesories'>Accesories</Link>
          {/* ✅ fixed active underline target */}
          {menu === 'accesories' ? <hr /> : null}
          <ul className='nav-menu-submenu'>
            <li><Link to="/accesories/jewels" style={{ textDecoration: 'none', color: 'brown' }}>Jewels</Link></li>
            <li><Link to="/accesories/perfumes" style={{ textDecoration: 'none', color: 'brown' }}>Perfumes</Link></li>
            <li><Link to="/accesories/phonecases" style={{ textDecoration: 'none', color: 'brown' }}>PhoneCases</Link></li>
            <li><Link to="/accesories/nailproducts" style={{ textDecoration: 'none', color: 'brown' }}>NailProducts</Link></li>
            <li><Link to="/accesories/handbags" style={{ textDecoration: 'none', color: 'brown' }}>HandBags</Link></li>
          </ul>
        </li>

        <li onClick={() => setMenu('stationary')}>
          <Link style={{ textDecoration: 'none' }} to='/stationary'>Stationary</Link>
          {menu === 'stationary' ? <hr /> : null}
        </li>
      </ul>

      <div className="nav-login-cart">
        <Link style={{ textDecoration: 'none' }} to='/login'><button>Login</button></Link>
        <Link style={{ textDecoration: 'none' }} to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar

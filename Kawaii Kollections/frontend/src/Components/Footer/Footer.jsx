import React from 'react'
import './Footer.css'; // Assuming you have a CSS file for styling
import instagram_icon from '../Assets/instagram_icon.png'; // Adjust the path as necessary
import pintester_icon from '../Assets/pintester_icon.png'; // Adjust the path as necessary
import whatsapp_icon from '../Assets/whatsapp_icon.png'; // Adjust the path as necessary
import logo from '../Assets/logo1.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={logo} alt="" />
            <p>KAWAII KOLLECTIONS</p>
        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icons-container">
                <img src={instagram_icon} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={pintester_icon} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={whatsapp_icon} alt="" />
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @2025. All rights reserved.</p>
        </div>

    </div>
  )
}

export default Footer
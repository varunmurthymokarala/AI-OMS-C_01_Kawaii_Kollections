import React from 'react'
import  './Breadcrum.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'


const Breadcrum = (props) => {
    const {product}=props;
  return (
    <div className='breadcrum'>
        HOME <img src={arrow_icon} alt="home_arrow"/>  SHOP <img src={arrow_icon} alt="shop_arrow"/> {product.category} <img src={arrow_icon} alt=''/> {product.name} <img src={arrow_icon} alt=''/>
    </div>
  )
}

export default Breadcrum

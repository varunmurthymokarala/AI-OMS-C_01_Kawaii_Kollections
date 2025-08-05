import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero3_img.png'

const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <h2>Where Wonder Meets Gifts</h2>
            <div>
                <div className="hero-hand-icon">
                    <p>Hello</p>
                    <img src={hand_icon} alt="" />    
                </div>
                <p1>Dive into delights for all ages  </p1>
                <p1>your next favorite find is just a click away.</p1>
            </div>
            <div className="hero-latest-btn">
                <div>Latest Collection</div>
                <img src={arrow_icon} alt="" />
            </div>
        </div>
        <div className="hero-right"></div>
        <img src={hero_image} alt="" />

    </div>
  )
}

export default Hero
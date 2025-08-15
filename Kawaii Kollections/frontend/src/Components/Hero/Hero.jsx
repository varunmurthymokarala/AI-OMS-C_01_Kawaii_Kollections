import React, { useState, useEffect } from 'react';
import './Hero.css';
import hand_icon from '../Assets/hand_icon.gif';
import arrow_icon from '../Assets/arrow.png';

import hero_image1 from '../Assets/product_7.1.1.png';
import hero_image2 from '../Assets/product_25.1.1.png';
import hero_image3 from '../Assets/product_6.1.1.png';
import hero_image4 from '../Assets/product_32.1.1.png';
import hero_image5 from '../Assets/product_29.1.1.png';

const Hero = () => {
  const images = [hero_image1, hero_image2, hero_image3, hero_image4, hero_image5];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Change image every 3 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="hero">
      
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

       <div className="hero-right">
            <img
                src={images[currentIndex]} 
                alt="sliderImages"
                className="hero-slide-img"
                 />
        </div>
    </div>
  );
};

export default Hero;

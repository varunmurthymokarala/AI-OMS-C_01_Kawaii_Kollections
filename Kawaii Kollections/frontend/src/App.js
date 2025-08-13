
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Shopcategory from './Pages/ShopCategory';
import LoginSignup from './Pages/LoginSignup';
import Shop from './Pages/Shop';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import SearchPage from './Pages/SearchPage';
/*
import men_banner from './Components/Assets/banner_mens_2.png';
import women_banner from './Components/Assets/banner_women_1.png';
import kid_banner from './Components/Assets/banner_kids_3.jpg';


<Route path="/mens" element={<Shopcategory banner={men_banner} category="men" />} />
          <Route path="/womens" element={<Shopcategory banner={women_banner} category="women" />} />
          <Route path="/kids" element={<Shopcategory banner={kid_banner} category="kid" />} />
*/


function App() {
  return (
    <div>
      
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Shop/>} />
          
          <Route path="/toys" element={<Shopcategory category="toys" />} />
          <Route path="/accesories" element={<Shopcategory category="accesories" />} />
          <Route path="/stationary" element={<Shopcategory  category="stationary" />} />

           {/* NEW: subcategory paths (optional) */}
          <Route path="/toys/:sub" element={<Shopcategory category="toys" />} />
          <Route path="/accesories/:sub" element={<Shopcategory category="accesories" />} />
          <Route path="/stationary/:sub" element={<Shopcategory category="stationary" />} />
          
          <Route path="/product/:productId" element={<Product />} />

          <Route path="/search" element={<SearchPage />} />    
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<LoginSignup/>}/> 
        </Routes>
        <Footer/>
      </BrowserRouter>

    </div>
  );
}

export default App;

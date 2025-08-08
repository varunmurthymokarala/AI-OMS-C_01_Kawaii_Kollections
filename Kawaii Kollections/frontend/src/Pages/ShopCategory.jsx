import React, {useContext, useMemo} from 'react'
import './CSS/ShopCategory.css'
import {ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'
import { useParams } from 'react-router-dom';


const Shopcategory = (props) => {
    const {all_product} = useContext(ShopContext);
    const { sub } = useParams(); // may be undefined

    // Normalize sub to lowercase in case URL has caps
  const activeSub = sub ? String(sub).toLowerCase() : null;

   const products = useMemo(() => {
    return all_product.filter((p) => {
      const matchesCat = p.category === props.category;
      const matchesSub = !activeSub || (p.subcategory && p.subcategory.toLowerCase() === activeSub);
      return matchesCat && matchesSub;
    });
  }, [all_product, props.category, activeSub]);

  return (
    <div className='shop-category'>
        <img className='shopcategory-banner' src={props.banner} alt="" />
        <div className="shopcategory-indexSort">
        <p>
          <span>Showing {products.length > 0 ? `1-${Math.min(products.length, 12)}` : 0}</span> out of {products.length} products
        </p>
            <div className="shopcategory-sort">
                Sort by <img src={dropdown_icon} alt="" />
            </div>
        </div>
        <div className="shopcategory-products">
            {products.map((item,i) =>{
                if(props.category === item.category){
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                    } 
                    else {
                        return null;
                    }
            })}

        </div>
        <div className="shopcategory-loadmore">
            Explore More
        </div>

    </div>
  )
}

export default Shopcategory
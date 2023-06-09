import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts]  = useState([])
    const [cart, setCart] = useState([]);
    useEffect(()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
        
    },[]);
   
    useEffect(()=>{
     const storedCart = getShoppingCart();
     const savedCart = [];
     for(let id in storedCart){
        const addedProduct = products.find(product => product.id === id);
        
       if(addedProduct){
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
       }
        
     }
     setCart(savedCart);
    },[products])
    
    const handleAddToCart = (product)=>{
        let newCart = [...cart, product];
        setCart(newCart)
        addToDb(product.id)
    }
    return (
        <div className='shop-container'>
            <div className='product-container'>
              {
                products.map(product => {
                    return <Product key={product.id} product ={product} handleAddToCart={handleAddToCart}/>
                })
              }
            </div>
            <div className='cart-container'>
                   
                   <Cart cart={cart}/>
            </div>
        </div>
    );
};

export default Shop;
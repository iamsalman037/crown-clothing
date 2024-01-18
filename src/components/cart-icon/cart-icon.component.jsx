import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector'
import {setIsCartOpen} from '../../store/cart/cart.action'
import {CartIconContainer, ShoppingIcon, ItemCount} from './cart-icon.styles.jsx'

const CartIcon = () => {
    const dispatch = useDispatch()
    const cartCount = useSelector(selectCartCount)
    const isCartOpen = useSelector(selectIsCartOpen)

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))
    const cartContainerRef = useRef(null);

    useEffect(() => {
        const handleClickOutsideCart = (event) => {
          if (cartContainerRef.current && !cartContainerRef.current.contains(event.target)) {
            dispatch(setIsCartOpen(false));
          }
        };
        document.addEventListener('click', handleClickOutsideCart);
        return () => {
          document.removeEventListener('click', handleClickOutsideCart);
        };
      }, [dispatch]);

    return(
        <CartIconContainer ref={cartContainerRef} onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount className='item-count'>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon
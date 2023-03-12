import { createContext, useReducer } from "react";
import {createAction} from '../utils/reducers/reducer.utils'

//Helper method to add Cart Items
const addCartItem = (cartItems, productToAdd) => {
    //Find if cartItems contains productToAdd
    const exisitingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
    
    //If found, increment quantity
    if(exisitingCartItem){
        return cartItems.map((cartItem) => cartItem.id===productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1}: cartItem)
    }
;
    //return new cartItems array with modified/new cart item
    return [...cartItems, {...productToAdd, quantity: 1}]
}

//Helper method to remove Cart Items
const removeCartItem = (cartItems, cartItemToRemove) => {
   //Find the cart item to remove
   const exisitingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)
   //check if quantity is equal to 1, If it is remove that item from the cart
    if(exisitingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }
   //return back cartItems with matching cart item with reduced quantity
   return cartItems.map((cartItem) => cartItem.id===cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1}: cartItem)
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0  
})

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) =>{
    const {type, payload} = action

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                ...payload
            }
         case CART_ACTION_TYPES.SET_IS_CART_OPEN:
                return{
                    ...state,
                    isCartOpen: payload
                }
        default:
            throw new Error(`undefined type ${type} in cartReducer`)
    }
}


export const CartProvider = ({children}) => {
        
      const [{cartItems, cartCount, cartTotal, isCartOpen}, dispatch] = useReducer(cartReducer, INITIAL_STATE)

    const updateCartItemsReducer = (newCartItems) =>{
        
            //generate newCartTotal
            const newCartTotal = newCartItems.reduce((total, cartItem)=> total + cartItem.quantity * cartItem.price, 0)
           
            //generate newCartCount
            const newCartCount = newCartItems.reduce((total, cartItem)=> total + cartItem.quantity, 0)
        /*
            dispatch new action with payload = {
                newCartItems,
                newCartTotal,
                newCartCount
            }
        */
       dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {cartItems: newCartItems, cartTotal: newCartTotal, cartCount:newCartCount}))
    }


    const addItemToCart = (productToAdd) =>{

        //Calling the helper method
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItemsReducer(newCartItems)
    }

    const removeItemToCart = (cartItemToRemove) =>{

        //Calling the helper method
        const newCartItems = removeCartItem(cartItems, cartItemToRemove)
        updateCartItemsReducer(newCartItems)
    }

    
    const clearItemFromCart = (cartItemToClear) =>{

        //Calling the helper method
        const newCartItems = clearCartItem(cartItems, cartItemToClear)
        updateCartItemsReducer(newCartItems)
    }

    const setIsCartOpen = (bool) =>{
        //createAction here is a helper method to call the reducer without typing the keys type and payload
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
    }

    const value = {
        isCartOpen, 
        setIsCartOpen, 
        cartItems, 
        addItemToCart, 
        cartCount, 
        removeItemToCart, 
        clearItemFromCart,
        cartTotal
    }
    
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}
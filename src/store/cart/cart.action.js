import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducers/reducer.utils";


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

const clearCartItem = (cartItems, cartItemToClear) => 
cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)


export const setIsCartOpen = (boolean) => 
createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)



export const addItemToCart = (cartItems, productToAdd) =>{

    const newCartItems = addCartItem(cartItems, productToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeItemFromCart = (cartItems, cartItemToRemove) =>{

    const newCartItems = removeCartItem(cartItems, cartItemToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}


export const clearItemFromCart = (cartItems, cartItemToClear) =>{
 
    const newCartItems = clearCartItem(cartItems, cartItemToClear)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}
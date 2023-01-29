import { createContext, useState, useEffect } from "react";

//Helper method to add Cart Items
const addCartItem = (cartItems, productToAdd) => {
    //Find if cartItems contains productToAdd
    const exisitingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
    
    //If found, increment quantity
    if(exisitingCartItem){
        return cartItems.map((cartItem) => cartItem.id===productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1}: cartItem)
    }

    //return new cartItems array with modified/new cart item
    return [...cartItems, {...productToAdd, quantity: 1}]
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0 
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartItem)=> total + cartItem.quantity, 0)
        setCartCount(newCartCount)
    },[cartItems])

    const addItemToCart = (productToAdd) =>{

        //Calling the helper method
        setCartItems(addCartItem(cartItems, productToAdd))
    }
    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount}
    
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}
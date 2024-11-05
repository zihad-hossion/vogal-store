import { createContext, useState, } from "react";
import { useLocation } from "react-router-dom";
import { useToggleScroll } from "../hooks/useToggleScroll";

export const CartContext = createContext();

export function CartContextProvider({ children }) {
    const [isCartOpen, setCartOpen] = useState(false);
    let location = useLocation();

    const toggleCartSidebar = () => {
        setCartOpen((prevIsOpen) => !prevIsOpen && location.pathname === "/carts" ? false : !prevIsOpen);
    };

    useToggleScroll(isCartOpen);

    return (
        <CartContext.Provider value={{ isCartOpen, setCartOpen, toggleCartSidebar }}>
            {children}
        </CartContext.Provider>
    )
}
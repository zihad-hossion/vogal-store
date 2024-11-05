import { createContext, useState, } from "react";
import { useToggleScroll } from "../hooks/useToggleScroll";

export const MenuContext = createContext();

export function MenuContextProvider({ children }) {
    const [isMenuOpen, setMenuOpen] = useState(false);

    useToggleScroll(isMenuOpen);

    return (
        <MenuContext.Provider value={{ isMenuOpen, setMenuOpen, }}>
            {children}
        </MenuContext.Provider>
    )
}
import { createContext, useState, } from "react";
import { useToggleScroll } from "../hooks/useToggleScroll";

export const DrawerContext = createContext();

const sections = {
    PROFILE: 'profile',
    ORDERS: 'orders',
    ADDRESS: 'address',
};

export function DrawerContextProvider({ children }) {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [activeSection, setActiveSection] = useState(sections.PROFILE);

    const openDrawer = (section = "profile") => {
        setActiveSection(section);
        setDrawerOpen(true);
    };

    // useToggleScroll(isDrawerOpen);

    return (
        <DrawerContext.Provider value={{ isDrawerOpen, setDrawerOpen, activeSection, setActiveSection, openDrawer, }}>
            {children}
        </DrawerContext.Provider>
    )
}
import React, { useState, useEffect } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import MobBar from "./MobBar";

function Header() {
    const windowWidth = useWindowSize();

    return (
        <header className="w-full relative mb-[76px] lg:mb-[141px]">
            {windowWidth > 992 ? <DeskBar /> : <MobBar />}
        </header>
    )
};

export default Header;

function DeskBar() {
    return (
        <div className="w-full fixed top-0 z-30">
            <Topbar />
            <Navbar />
        </div>
    )
}
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBox from "../../ui/SearchBox";
import CartIcon from "../../ui/CartIcon";
import AccountIcon from "../../ui/AccountIcon";

export default function Topbar() {

    return (
        <div className="bg-white">
            <div className="pageWidth flex items-center min-h-[60px] p-4 lg:min-h-[100px]">
                <Logo />
                <Promo />
                <SearchBox />
                <IconsCol />
            </div>
        </div>
    )
};


function Logo() {

    return (
        <Link to={"/"}>
            <div className="mgr block min-w-[50px] max-w-[70px] lg:max-w-[90px]">
                <img src="/logo-dark.png" alt="Logo" />
            </div>
        </Link>
    )
};

function Promo() {
    return (
        <div className="mgr flex items-center gap-4">
            <img src="/free-ship.svg" alt="Promo" className="w-[38px] h-[38px]" />
            <div className="text-sm uppercase">
                <p className="font-medium leading-[22px]">free shipping</p>
                <p className="font-normal leading-[22px]">ON ORDER ABOVE $99</p>
            </div>
        </div>
    )
};

function IconsCol() {
    return (
        <div className="flex items-center gap-2 ml-auto lg:ml-[unset]">
            <AccountIcon />
            <CartIcon />
        </div>
    )
};

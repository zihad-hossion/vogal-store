import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FiShoppingCart } from "react-icons/fi";


export default function NoItem() {
    const navigate = useNavigate();
    const { setCartOpen } = useContext(CartContext);

    function handleShop() {
        setCartOpen(false);
        navigate("/collections");
    }

    function handleLogin() {
        setCartOpen(false);
        navigate("/login")
    }

    return (
        <>
            <div className="h-full flex items-center justify-center flex-col">
                <p className="mb-5"><FiShoppingCart className="w-16 h-16 text-[#ddd] fill-white" /></p>
                <p className="mb-6">No Products in the Cart.</p>
                <button onClick={() => handleShop()} className="uppercase text-white bg-black p-[10px_30px] mb-10">Continue shopping</button>
                <p className="font-medium uppercase">have an account?</p>
                <p><button onClick={handleLogin}>Log in</button>   to check out faster.</p>
            </div>
        </>
    )
}

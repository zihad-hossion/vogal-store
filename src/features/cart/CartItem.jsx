import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import QuantityBtnSet from "../../ui/QuantityBtnSet";

function CartItem({ product }) {
    const { id, image, title, price, } = product;
    const navigate = useNavigate();
    const { setCartOpen } = useContext(CartContext);

    function handleCollection() {
        setCartOpen(false);
        navigate(`/collections/${id}`);
    };

    return (
        <article className="flex items-center justify-start  gap-7 lg:gap-5 my-2 py-1 border-b border-[#f5f5f5]">
            <div onClick={handleCollection} className="w-32 cursor-pointer">
                <img src={image} alt="" className="w-full h-full" />
            </div>
            <div className="text-base">
                <h3 onClick={handleCollection} className="text-base font-medium mb-2 cursor-pointer transition">{title}</h3>
                <p className="text-base font-medium mb-3">${price}</p>
                <QuantityBtnSet product={product} />
            </div>
        </article>
    )
};

export default CartItem;

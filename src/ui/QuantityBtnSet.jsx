import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, fetchTotalAmount, fetchCartItems, fetchTotalQuantity } from "../slices/cartSlice";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";

export default function QuantityBtnSet({ product }) {
    const { id, quantity } = product;
    const [inputQuantity, setInputQuantity] = useState(quantity);
    const isLoading = useSelector((state) => state.cart.isLoading);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };

    const handleIncrease = () => {
        const newQuantity = inputQuantity + 1;
        setInputQuantity(newQuantity);
        dispatch(updateQuantity({ id, newQuantity }));
        dispatch(fetchTotalAmount());
        dispatch(fetchTotalQuantity());
    };

    const handleDecrease = () => {
        if (inputQuantity > 1) {
            const newQuantity = inputQuantity - 1;
            setInputQuantity(newQuantity);
            dispatch(updateQuantity({ id, newQuantity }));
            dispatch(fetchTotalAmount());
            dispatch(fetchTotalQuantity());
        }
    };

    function handleInput(e) {
        let newQuantity = parseInt(e.target.value, 10);
        if (!isNaN(newQuantity) && newQuantity > 0) {
            setInputQuantity(newQuantity);
            dispatch(updateQuantity({ id, newQuantity }));
            dispatch(fetchTotalAmount());
        }
    }

    return (
        <div className="flex items-center gap-1">
            <button onClick={() => handleDecrease(product)} className="cartItemBtn" disabled={isLoading}><FaMinus /></button>
            <input className="w-10 h-7 text-center border border-[#ddd]" value={product?.quantity} onChange={handleInput} />
            <button onClick={() => handleIncrease(product)} className="cartItemBtn" disabled={isLoading}><FaPlus /></button>
            <button onClick={() => handleRemoveFromCart(product)} className="ml-2 text-gray-500 hover:text-red-700 transition" disabled={isLoading}><RiDeleteBinLine /></button>
        </div>
    )
};
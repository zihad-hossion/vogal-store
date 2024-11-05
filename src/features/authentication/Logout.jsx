import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../services/apiAuth";
import { clearUser } from "../../slices/authSlice";
import { fetchCartItems } from "../../slices/cartSlice";

export default function Logout() {
    const [logout, { isLoading, }] = useLogoutMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login', { replace: true });
            dispatch(clearUser());
            dispatch(fetchCartItems());
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <button disabled={isLoading} onClick={handleLogout} className="w-full text-base font-medium p-3 bg-pink-300 hover:text-white hover:bg-blue-800 tracking-wider transition mt-5">
            Logout
        </button>
    )
};


import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import supabase from "../../services/supabase";
import { fetchCartItems } from "../../slices/cartSlice";


export default function useCartItems() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    useEffect(() => {
        if (cartItems.length === 0) {
            dispatch(fetchCartItems());
        }

        const channel = supabase
            .channel('cart-changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'cart' }, (payload) => {
                dispatch(fetchCartItems());
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };

    }, [dispatch, cartItems.length]);

    const cachedCartItems = useMemo(() => cartItems, [cartItems]);

    return cachedCartItems;
};
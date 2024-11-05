import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import supabase from "../../services/supabase";
import { fetchTotalAmount } from "../../slices/cartSlice";


export default function useTotalAmount() {
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const dispatch = useDispatch();

    useEffect(() => {
        if (totalAmount === 0) {
            dispatch(fetchTotalAmount());
        }

        const channel = supabase
            .channel('cart-changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'cart' }, (payload) => {
                // console.log('Cart change detected:', payload);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const cachedTotalAmount = useMemo(() => totalAmount, [totalAmount])
    return cachedTotalAmount;
};


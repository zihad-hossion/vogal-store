import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import supabase, { supabaseUrl } from "./supabase";

export async function getCart() {
    let { data, error } = await supabase.from('cart').select('*')
    return data;
};

export async function addCart({ id, image, title, price }) {
    const { data, error } = await supabase
        .from('cart')
        .insert([
            { id, image, title, price }
        ])
        .select()

    return data;
}

export const apiCart = createApi({
    reducerPath: "apiCart",
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getCart: builder.query({
            async queryFn() {
                try {
                    let { data, error } = await supabase.from('cart').select('*')

                    if (error) {
                        console.log(error);

                        throw new Error("Cart could not be loaded");
                    }

                    return { data };
                }
                catch (err) {
                    console.log(err);
                }
            }
        }),
        addCart: builder.query({

        })
    })
})
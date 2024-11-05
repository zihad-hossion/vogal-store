import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import supabase, { supabaseUrl } from "./supabase";

// export async function getCategories() {

//     let { data, error } = await supabase.from('categories').select('*');

//     if (error) {
//         console.log(error);
//         throw new Error("Categories could not be loaded");
//     }

//     return data;
// };

export const apiCategories = createApi({
    reducerPath: "apiCategories",
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getCategories: builder.query({
            async queryFn() {
                try {
                    let { data, error } = await supabase.from('categories').select('*');

                    if (error) {
                        console.log(error);
                        throw new Error("Categories could not be loaded");
                    }

                    return { data };
                }
                catch (error) {
                    console.log(error);
                }
            }
        })
    })
})


export const { useGetCategoriesQuery } = apiCategories;
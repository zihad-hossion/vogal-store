import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import supabase, { supabaseUrl } from "./supabase";

export const apiBlogs = createApi({
    reducerPath: "apiBlogs",
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getBlogs: builder.query({
            async queryFn() {
                try {
                    let { data, error } = await supabase.from('blogs').select('*');

                    if (error) {
                        console.log(error);

                        throw new Error("Blogs could not be loaded");
                    }

                    return { data };

                } catch (err) {
                    console.log(err);
                }
            }
        })
    })
})

export const { useGetBlogsQuery } = apiBlogs;
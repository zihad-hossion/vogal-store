import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import supabase, { supabaseUrl } from "./supabase";

export const apiAuth = createApi({
    reducerPath: 'apiAuth',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        signup: builder.mutation({
            async queryFn({ fullName, email, password }) {
                try {
                    let { data, error } = await supabase.auth.signUp({
                        email, password, options: {
                            data: {
                                fullName,
                            }
                        }
                    })

                    if (error) throw new Error(error.message);
                    return { data };
                } catch (error) {
                    return { error: { status: 'Sign Up Failed', error: error.message } };
                }
            },
        }),
        login: builder.mutation({
            async queryFn({ email, password }) {
                try {
                    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                    if (error) {
                        throw error;
                    }
                    return { data };
                } catch (error) {
                    return { error: { status: 'Log In Failed!!!', error: error.message } };
                }
            },
        }),
        logout: builder.mutation({
            async queryFn() {
                try {
                    const { error } = await supabase.auth.signOut();
                    if (error) {
                        throw error;
                    }
                    return { data: 'Log Out successful' };
                } catch (error) {
                    return { error: { status: 'Logout Failed.', error: error.message } };
                }
            },
        }),
        getCurrentUser: builder.query({
            async queryFn() {
                try {
                    // Get the current session
                    const { data: session } = await supabase.auth.getSession();

                    // If no session, return null
                    if (!session.session) return { data: null };

                    // Get the current user data
                    const { data, error } = await supabase.auth.getUser();

                    // Handle errors
                    if (error) throw new Error(error.message);

                    // Return the user data
                    return { data: data.user };
                } catch (error) {
                    return { error: { status: 'CUSTOM_ERROR', error: error.message } };
                }
            },
        }),
        updateUser: builder.mutation({
            async queryFn({ password, fullName, phone }) {
                try {
                    let updateData = {};

                    if (fullName) updateData.fullName = fullName;
                    // if (phone) updateData.phone = String(phone);
                    if (phone) updateData.phone = phone;
                    if (password) updateData.password = password;
                    console.log("Update Data:", updateData);

                    const { data, error } = await supabase.auth.updateUser(updateData);
                    if (error) {
                        console.error("Supabase Update Error:", error);
                        return { error: { status: 'CUSTOM_ERROR', error: error.message } };
                    }
                    return { data };
                } catch (error) {
                    return { error: { status: 'CUSTOM_ERROR', error: error.message } };
                }
            }
        }),
    }),
});

export const { useSignupMutation, useLoginMutation, useLogoutMutation, useGetCurrentUserQuery, useUpdateUserMutation } = apiAuth;


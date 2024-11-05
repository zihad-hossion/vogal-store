import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../services/supabase";

const calculateTotalQuantity = (items) => {
    const validItems = Array.isArray(items) ? items : [];
    return validItems.reduce((sum, item) => sum + item.quantity, 0);
};
const calculateTotalAmount = (items) => items.reduce((total, item) => total + item.price * item.quantity, 0);

export const fetchCartItems = createAsyncThunk(
    'cart/fetchCartItems',
    async (_, { getState }) => {
        const { auth } = getState();
        const userId = auth?.user ? auth.user.id : null;
        console.log(auth);

        if (userId) {
            const { data, error } = await supabase.from('cart').select('*').eq('user_id', userId);
            if (error) throw new Error(error.message);
            return data;
        } else {
            return JSON.parse(localStorage.getItem('cart')) || [];
        }
    }
);

export const fetchTotalQuantity = createAsyncThunk(
    'cart/fetchTotalQuantity',
    async (_, { getState }) => {
        const { auth } = getState();
        const userId = auth.user ? auth.user.id : null;

        if (userId) {
            const { data, error } = await supabase.from('cart').select('quantity').eq('user_id', userId);
            if (error) {
                throw new Error(error.message);
            }
            return data.reduce((sum, item) => sum + item.quantity, 0);
        } else {
            const localCart = JSON.parse(localStorage.getItem('cart')) || [];
            return localCart.reduce((sum, item) => sum + item.quantity, 0);
        }
    }
);
export const fetchTotalAmount = createAsyncThunk(
    'cart/fetchTotalAmount',
    async (_, { getState }) => {
        const { auth } = getState();
        const userId = auth?.user ? auth.user.id : null;

        if (userId) {
            const { data, error } = await supabase.from('cart').select('price, quantity').eq('user_id', userId);
            if (error) {
                throw new Error(error.message);
            }
            return data.reduce((sum, item) => sum + item.price * item.quantity, 0);
        } else {
            const localCart = JSON.parse(localStorage.getItem('cart')) || [];
            return localCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        }
    }
);
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (product, { getState }) => {
        const { auth, cart } = getState();
        const userId = auth?.user ? auth.user.id : null;
        const existingItem = cart.items.find(item => item.id === product.id);

        if (userId) {
            if (existingItem) {
                const { error } = await supabase
                    .from('cart')
                    .update({ quantity: existingItem.quantity + product.quantity })
                    .eq('id', existingItem.id)
                    .eq('user_id', userId);
                if (error) throw new Error(error.message);
            } else {
                const { error } = await supabase
                    .from('cart')
                    .insert({
                        id: product.id,
                        user_id: userId,
                        title: product.title,
                        image: product.image,
                        price: product.price,
                        quantity: product.quantity
                    });
                if (error) throw new Error(error.message);
            }

            const { data, error: fetchError } = await supabase.from('cart').select('*').eq('user_id', userId);;
            if (fetchError) {
                throw new Error(fetchError.message);
            }
            return data;
        } else {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItem = cartItems.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += product.quantity;
            } else {
                cartItems.push({ ...product, quantity: product.quantity });
            }
            localStorage.setItem('cart', JSON.stringify(cartItems));
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
);
export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (product, { getState }) => {
        const { auth } = getState();
        const userId = auth?.user ? auth.user.id : null;

        if (userId) {
            const { error } = await supabase
                .from('cart')
                .delete()
                .eq('id', product.id)
                .eq('user_id', userId);

            if (error) throw new Error(error.message);

            const { data, error: fetchError } = await supabase.from('cart').select('*');
            if (fetchError) {
                throw new Error(fetchError.message);
            }
            return data;
        } else {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            const itemIndex = cartItems.findIndex(item => item.id === product.id);
            if (itemIndex !== -1) {
                cartItems.splice(itemIndex, 1);
                localStorage.setItem('cart', JSON.stringify(cartItems));
                return JSON.parse(localStorage.getItem('cart'));
            }
        }
    }
);
export const increaseQuantity = createAsyncThunk(
    'cart/increaseQuantity',
    async (product, { getState, dispatch }) => {
        const { cart, auth } = getState();
        const userId = auth?.user ? auth.user.id : null;

        const existingItem = cart.items.find(item => item.id === product.id);

        if (userId) {
            if (existingItem) {
                const { error } = await supabase
                    .from('cart')
                    .update({ quantity: existingItem.quantity += 1 })
                    .eq('id', existingItem.id)
                    .eq('user_id', userId);
                if (error) throw new Error(error.message);
            }

            const { data, error } = await supabase.from('cart').select('*').eq('user_id', userId);
            if (error) throw new Error(error.message);
            return data;
        } else {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItem = cartItems.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity + 1;
                dispatch(fetchTotalQuantity());
            }
            localStorage.setItem('cart', JSON.stringify(cartItems));
            return JSON.parse(localStorage.getItem('cart')) || [];
        }
    }
);
export const decreaseQuantity = createAsyncThunk(
    'cart/decreaseQuantity',
    async (product, { getState, dispatch }) => {
        const { cart, auth } = getState();
        const userId = auth.user ? auth.user.id : null;

        const existingItem = cart.items.find(item => item.id === product.id);

        if (userId) {
            if (existingItem) {
                const { error } = await supabase
                    .from('cart')
                    .update({ quantity: existingItem.quantity -= 1 })
                    .eq('id', existingItem.id)
                    .eq('user_id', userId);
                if (error) throw new Error(error.message);
            }
            const { data, error } = await supabase.from('cart').select('*').eq('user_id', userId);
            if (error) throw new Error(error.message);
            return data;
        } else {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItem = cartItems.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity - 1;
                dispatch(fetchTotalQuantity());
            }
            localStorage.setItem('cart', JSON.stringify(cartItems));
            return JSON.parse(localStorage.getItem('cart')) || [];
        }
    }
);
export const updateQuantity = createAsyncThunk(
    'cart/updateQuantity',
    async ({ id, newQuantity }, { getState, dispatch }) => {
        const { auth } = getState();
        const userId = auth?.user ? auth.user.id : null;

        if (userId) {
            const { error } = await supabase
                .from('cart')
                .update({ quantity: newQuantity })
                .eq('id', id)
                .eq('user_id', userId);
            if (error) throw new Error(error.message);

            const { data, error: fetchError } = await supabase.from('cart').select('*').eq('user_id', userId);;
            if (fetchError) {
                throw new Error(fetchError.message);
            }
            dispatch(fetchTotalQuantity());
            return data;
        } else {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItem = cartItems.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity = newQuantity;
            }
            localStorage.setItem('cart', JSON.stringify(cartItems));
            dispatch(fetchTotalQuantity());

            return JSON.parse(localStorage.getItem('cart'));
        }
    }
);
export const mergeCartOnLogin = createAsyncThunk(
    'cart/mergeCartOnLogin',
    async (_, { getState }) => {
        const { auth } = getState();
        const userId = auth?.user ? auth.user.id : null;

        if (!userId || !sessionId) {
            // No need to merge if the user isn't logged in or has no session
            return;
        }

        try {
            // 1. Fetch the session cart items
            const { data: sessionCartItems, error: sessionError } = await supabase
                .from('cart')
                .select('*')
                .eq('session_id', sessionId);

            if (sessionError) {
                throw new Error(sessionError.message);
            }

            // 2. For each item in the session cart:
            for (const item of sessionCartItems) {
                // a. Check if the item already exists in the user's cart
                const { data: existingItem, error: existingError } = await supabase
                    .from('cart')
                    .select('*')
                    .eq('user_id', userId)
                    .eq('id', item.id)
                    .single(); // Use .single() to get a single row

                if (existingError && existingError.code !== 'PGRST116') {
                    // 'PGRST116' means no row was found, which is expected if the item doesn't exist
                    throw new Error(existingError.message);
                }

                if (existingItem) {
                    // b. If the item exists, update the quantity
                    const newQuantity = existingItem.quantity + item.quantity;
                    const { error: updateError } = await supabase
                        .from('cart')
                        .update({ quantity: newQuantity })
                        .eq('user_id', userId)
                        .eq('id', item.id);

                    if (updateError) {
                        throw new Error(updateError.message);
                    }
                } else {
                    // c. If the item doesn't exist, insert it with the user_id
                    const { error: insertError } = await supabase
                        .from('cart')
                        .insert({ ...item, user_id: userId, session_id: null }); // Associate with user, remove session

                    if (insertError) {
                        throw new Error(insertError.message);
                    }
                }
            }

            // 3. Delete the session cart items
            const { error: deleteError } = await supabase
                .from('cart')
                .delete()
                .eq('session_id', sessionId);

            if (deleteError) {
                throw new Error(deleteError.message);
            }

            // 4. Fetch the updated cart items (now associated with the user)
            const { data, error: fetchError } = await supabase
                .from('cart')
                .select('*')
                .eq('user_id', userId);

            if (fetchError) {
                throw new Error(fetchError.message);
            }

            return data;

        } catch (error) {
            console.error("Error merging cart on login:", error);
            // Handle the error appropriately (e.g., display an error message to the user)
            throw error;
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items
                    = action.payload;
                state.totalQuantity = calculateTotalQuantity(action.payload);
                state.totalAmount = calculateTotalAmount(action.payload);
            })
            .addCase(fetchCartItems.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchTotalQuantity.fulfilled, (state, action) => {
                state.totalQuantity = action.payload;
            })
            .addCase(addToCart.pending, (state,) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
                state.totalQuantity = action.payload.reduce((total, item) => total + item.quantity, 0);
                state.totalAmount = action.payload.reduce((total, item) => total + item.price * item.quantity, 0);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = action.payload;
                state.totalQuantity = action.payload.reduce((total, item) => total + item.quantity, 0);
            })
            .addCase(increaseQuantity.fulfilled, (state, action) => {
                action.payload.forEach(updatedItem => {
                    const existingItemIndex = state.items.findIndex(item => item.id === updatedItem.id);
                    if (existingItemIndex !== -1) {
                        state.items[existingItemIndex] = {
                            ...state.items[existingItemIndex],
                            quantity: updatedItem.quantity
                        };
                    }
                });
                state.totalQuantity = calculateTotalQuantity(action.payload);
            })
            .addCase(decreaseQuantity.fulfilled, (state, action) => {
                action.payload.forEach(updatedItem => {
                    const existingItemIndex = state.items.findIndex(item => item.id === updatedItem.id);
                    if (existingItemIndex !== -1) {
                        state.items[existingItemIndex] = {
                            ...state.items[existingItemIndex],
                            quantity: updatedItem.quantity
                        };
                    }
                });
                state.totalQuantity = calculateTotalQuantity(action.payload);
            })
            .addCase(fetchTotalAmount.fulfilled, (state, action) => {
                state.totalAmount = action.payload;
            })
            .addCase(updateQuantity.fulfilled, (state, action) => {
                action.payload.forEach(updatedItem => {
                    const existingItemIndex = state.items.findIndex(item => item.id === updatedItem.id);
                    if (existingItemIndex !== -1) {
                        state.items[existingItemIndex] = {
                            ...state.items[existingItemIndex],
                            quantity: updatedItem.quantity
                        };
                    }
                });
                state.totalAmount = calculateTotalAmount(action.payload);
            })
            .addCase(mergeCartOnLogin.fulfilled, (state, action) => {
                if (action.payload) { // Check if payload exists
                    state.items = action.payload;
                    state.totalQuantity = calculateTotalQuantity(action.payload);
                    state.totalAmount = calculateTotalAmount(action.payload);
                }
            });
    }
});

export default cartSlice.reducer;
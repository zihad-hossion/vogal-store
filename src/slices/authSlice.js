// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { apiAuth } from "../services/apiAuth";


// get data from local storage
const userFromStorage = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: userFromStorage || null,
    isLoading: false,
    isAuthenticated: !!userFromStorage,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.isLoading = false;
            state.isAuthenticated = !!action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload)); // Save to local storage
        },
        clearUser(state) {
            state.user = null;
            state.isLoading = false;
            state.isAuthenticated = false;
            localStorage.removeItem('user'); // Clear from local storage
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(apiAuth.endpoints.getCurrentUser.matchPending, (state, { payload }) => {
                state.isLoading = true;
            })
            .addMatcher(apiAuth.endpoints.getCurrentUser.matchFulfilled, (state, { payload }) => {
                state.user = payload;
                state.isLoading = false;
                state.isAuthenticated = !!payload;
                localStorage.setItem('user', JSON.stringify(payload));
            })
            .addMatcher(apiAuth.endpoints.getCurrentUser.matchRejected, (state, { payload }) => {
                state.isLoading = false;
            })
            .addMatcher(apiAuth.endpoints.logout.matchPending, (state) => {
                state.isLoading = true;
            })
            .addMatcher(apiAuth.endpoints.logout.matchFulfilled, (state) => {
                state.user = null;
                state.isLoading = false;
                state.isAuthenticated = false;
                localStorage.removeItem('user');
            })
    },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;

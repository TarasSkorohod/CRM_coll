import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        allUsers: [],
        currentUser: {},
        renderUser: false
    },
    reducers: {
        setUsersData: (state, action) => {
            state.allUsers = action.payload;
        },
        setCurrentUsersData: (state, action) => {
            state.currentUser = {...state.currentUser, ...action.payload};
        },
        clearCurrentUser: (state) => {
            state.currentUser = {}
        },
        renderUserData: (state) => {
            state.renderUser = !state.renderUser;
        }
    },
});

export const { setUsersData, setCurrentUsersData, renderUserData, clearCurrentUser } = usersSlice.actions;

export default usersSlice.reducer;
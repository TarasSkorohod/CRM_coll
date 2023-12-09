import { createSlice } from '@reduxjs/toolkit';

const telephonySlice = createSlice({
    name: 'telephony',
    initialState: {
        allTelephony: [],
        currentTelephony: {},
        renderTelephony: false
    },
    reducers: {
        getAllTelephony: (state, action) => {
          state.allTelephony = action.payload;
        },
        getCurrentTelephony: (state, action) => {
            state.currentTelephony = action.payload;
        },
        stateRenderTelephony: (state, action) => {
            state.renderTelephony = action.payload;
        }
    },
});

export const {
    getCurrentTelephony,
    stateRenderTelephony,
    getAllTelephony
} = telephonySlice.actions;

export default telephonySlice.reducer;
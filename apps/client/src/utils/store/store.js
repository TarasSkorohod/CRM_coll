import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import users from './slices/usersSlice';
import telephony from './slices/telephonySlice';
import groups from './slices/groupsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        users,
        telephony,
        groups
    },
});

export default store;
import { configureStore } from '@reduxjs/toolkit';
import { prescriptionsReducer } from "../features/prescriptions/prescriptionsSlice";
import logger from 'redux-logger';
import { userReducer } from '../features/user/userSlice';

export const store = configureStore({
    reducer: {
        prescriptions: prescriptionsReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger])
});
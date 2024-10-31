import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null
    }
    
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        clearUser: (state) => {
            state.currentUser = null; // Clear the currentUser on logout
        }
    }
    });
    
export const userReducer = userSlice.reducer;
    
export const { setCurrentUser, clearUser } = userSlice.actions;
    
export const selectCurrentUser = (state) => {
    return state.user.currentUser;
}


export default userSlice;
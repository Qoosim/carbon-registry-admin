import { createSlice } from '@reduxjs/toolkit'

interface UserState {
    user: any;
    error: string | null;
    isLoading: boolean;
}

const initialUserState: UserState = {
    user: null,
    error: null,
    isLoading: false,
};

export const UserSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload,
            state.error = null,
            state.isLoading = false
        },
        setUserError: (state, action) => {
            state.error = action.payload,
            state.isLoading = false
        }
    }
})

export const {
    setIsLoading,
    setUser,
    setUserError
} = UserSlice.actions

export default UserSlice.reducer

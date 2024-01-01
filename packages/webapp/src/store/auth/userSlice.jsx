import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    avatar: '',
    userName: '',
    email: '',
    authority: []
}

export const userSlice = createSlice({
	name: 'auth/loggedInUser',
	initialState,
	reducers: {
        setLoggedInUser: (_, action) => action.payload,
        userLoggedOut: () => initialState,
	},
})

export const { setLoggedInUser } = userSlice.actions

export default userSlice.reducer
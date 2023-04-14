import {createSlice} from "@reduxjs/toolkit";

const LS_FV_KEY = 'rfc'

interface GithubState {
    favorites: string[]
}

const initialState: GithubState = {
    favorites: JSON.parse(localStorage.getItem(LS_FV_KEY) ?? '[]')
}
    
export const githubSlice = createSlice({
    name: 'github',
    initialState,
    reducers: { 
        addFavorites (state, action) {
            state.favorites.push(action.payload)
            localStorage.setItem(LS_FV_KEY, JSON.stringify(state.favorites))
        },
        removeFavorites (state, action) {
            state.favorites = state.favorites.filter(f => f !== action.payload)
            localStorage.setItem(LS_FV_KEY, JSON.stringify(state.favorites))
        },
    }
})

export const githubActions = githubSlice.actions;
export const githubReducer = githubSlice.reducer;
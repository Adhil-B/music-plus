import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    settings:  false,
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setSettings: (state, action) => {
            state.settings = action.payload;
        },
    },
})

export const { setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;


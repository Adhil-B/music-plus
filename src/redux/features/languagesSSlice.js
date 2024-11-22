import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    languagesS:  ['english'],
};

const languagesSSlice = createSlice({
    name: "languagesS",
    initialState,
    reducers: {
        setLanguagesS: (state, action) => {
            state.languagesS = action.payload;
        },
    },
})

export const { setLanguagesS } = languagesSSlice.actions;
export default languagesSSlice.reducer;

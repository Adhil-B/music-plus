import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    downloads:  ['4d'],
};

const downloadsSlice = createSlice({
    name: "downloads",
    initialState,
    reducers: {
        setDownloads: (state, action) => {
            state.downloads = action.payload;
        },
    },
})

export const { setDownloads } = downloadsSlice.actions;
export default downloadsSlice.reducer;

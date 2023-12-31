import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    qualities:  [4],
};

const qualitiesSlice = createSlice({
    name: "qualities",
    initialState,
    reducers: {
        setQualities: (state, action) => {
            state.qualities = action.payload;
        },
    },
})

export const { setQualities } = qualitiesSlice.actions;
export default qualitiesSlice.reducer;

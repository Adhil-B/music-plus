import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    homeCategories:  ['listen','picks','recommendations','trending','charts','releases','featured'],
};

const homeCategoriesSlice = createSlice({
    name: "homeCategories",
    initialState,
    reducers: {
        setHomeCategories: (state, action) => {
            state.homeCategories = action.payload;
        },
    },
})

export const { setHomeCategories } = homeCategoriesSlice.actions;
export default homeCategoriesSlice.reducer;

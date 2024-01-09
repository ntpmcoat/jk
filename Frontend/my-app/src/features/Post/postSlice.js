import { createSlice } from "@reduxjs/toolkit";

const postSlice=createSlice({
    name:'Post',
    initialState:[],
    reducers:{
        addPost:(state,action)=>{
            state.push(action.payload);
        },
    },
});

export const {addPost} = postSlice.actions;
export default postSlice.reducer;
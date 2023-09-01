import { configureStore, createSlice } from "@reduxjs/toolkit";

const reRender = createSlice({
    name: 'reRender',
    initialState : false,
    reducers : {
        reRendering(state){ 
            return !state;
        }
    }
})

export let { reRendering } = reRender.actions;

export default configureStore({
    reducer: {
        reRender : reRender.reducer
    }
  })
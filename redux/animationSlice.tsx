import { createSlice } from "@reduxjs/toolkit";
interface initialStateType {
    homePageSlider:number,
}
const initialState:initialStateType  ={homePageSlider:0}
export const animationSlice = createSlice({
    name:"sliderAnimation",
    initialState,
    reducers:{
        index(state){
            state.homePageSlider = state.homePageSlider
        }
    }
})
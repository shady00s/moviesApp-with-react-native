
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { movieDetailsThunk } from '../thunk/movieDetailsThunk';
import { MovieModel } from './../../models/movieModel';

 type MoviesDetailsType ={
    movieDetails: MovieModel |null,
    similarMovies : MovieModel[]
 } 
const initialState:MoviesDetailsType = {
    movieDetails:null,
    similarMovies:[]
}
export const movieDetailsSlice = createSlice({
    name:"movieDetailsPageSlice",
    initialState,
    reducers:{

    },
    extraReducers(builder) {
        builder.addCase(movieDetailsThunk.fulfilled,(state,{payload})=>{
            state.movieDetails = payload.body.movieDetails,
            state.similarMovies = payload.body.similarMovies
        })
    },
})

export const selectStatus = (state: RootState) =>state.movieDetailsReducer;

export const movieDetailsReducer = movieDetailsSlice.reducer
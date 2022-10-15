
import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { movieDetailsThunk } from '../thunk/movieDetailsThunk';
import { MovieModel, SingleMovieModel } from './../../models/movieModel';

 type MoviesDetailsType ={
    movieDetails: SingleMovieModel |null,
    similarMovies : MovieModel[],
    status:string,
    error:SerializedError|null
 } 
const initialState:MoviesDetailsType = {
    movieDetails:null,
    similarMovies:[],
    status:"",
    error:null
}
export const movieDetailsSlice = createSlice({
    name:"movieDetailsPageSlice",
    initialState,
    reducers:{

    },
    extraReducers(builder) {
        builder.addCase(movieDetailsThunk.pending,(state,{payload})=>{
            state.status = "loading",
            state.error = null
        })

        builder.addCase(movieDetailsThunk.fulfilled,(state,{payload})=>{
            state.movieDetails = payload.body.movieDetails,
            state.similarMovies = payload.body.similarMovies
            state.status = "succsses",
            state.error = null
        })

       

        builder.addCase(movieDetailsThunk.rejected,(state,action)=>{
            state.status = "error",
            state.error = action.error
        })
    },
})

export const movieDetailsStatus = (state: RootState) =>state.movieDetailsReducer;

export const movieDetailsReducer = movieDetailsSlice.reducer
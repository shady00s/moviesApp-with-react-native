
import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { introMoviesThunk } from '../thunk/introMovieThunk';
import { MovieModel } from './../../models/movieModel';


type introMovieStateType ={
    moviesList:MovieModel[] | null,
    status: string,
    error: SerializedError | null
}

const initialState:introMovieStateType ={

    moviesList: null ,
    status:"",
    error:null

}
export const introMovieSlice= createSlice({
    name:"introMovieSlice",
    initialState,
    reducers:{

    },
    extraReducers(builder) {
        builder.addCase(introMoviesThunk.pending,(state)=>{
            state.status = "loading",
            state.error = null

        })

        builder.addCase(introMoviesThunk.fulfilled,(state,{payload})=>{
            state.moviesList = payload
            state.status = "sucssess",
            state.error = null

        })
    },

})


export const introMoviesReducer = introMovieSlice.reducer

export const introMoviesState = (state:RootState)=>state.introMoviesReducer
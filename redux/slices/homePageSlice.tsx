
import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { MoviesCategory, MovieModel } from '../../models/movieModel';
import { RootState } from '../store';
import { homePageThunk } from '../thunk/homePageThunk';

  type  initialStateType={
    PopularMoviesList:MovieModel[] ,
    RecommendedMoviesList:MovieModel[] ,
    MoviesCategory:MoviesCategory[] ,
    TopRatedMoviesList:MovieModel[] ,
    status:string,
    error:SerializedError | null
  }


const initialState:initialStateType = {
    PopularMoviesList: [],
    RecommendedMoviesList:[],
    MoviesCategory:[],
    TopRatedMoviesList:[],
    status:"",
    error:null

}




export const homePageSlice = createSlice({
    name:"homePage",
    initialState,
    reducers:{

    },

    extraReducers(builder) {
      builder.addCase(homePageThunk.pending, (state) => {
        
        state.status = "loading";
        state.error = null;
      });
        builder.addCase(homePageThunk.fulfilled ,(state,{payload})=>{
                state.PopularMoviesList = payload.popularMoviesList;
                state.RecommendedMoviesList = payload.recommendedMoviesList;
                state.TopRatedMoviesList = payload.topRatedMoviesList;
                state.MoviesCategory = payload.moviesCategories;
                state.status = "sucssess";
                state.error = null;
        })

        builder.addCase(homePageThunk.rejected, (state,action) => {
        
          state.status = "failed";
          state.error = action.error;
        });
    },
})  

export const homePageStatus = (state: RootState) =>
  state.homePageReducer;
export const homePageReducer = homePageSlice.reducer
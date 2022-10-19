
import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { MoviesCategory, MovieModel, TvSHowModel, TvCategory, CartoonsData, TVDataModel } from '../../models/movieModel';
import { RootState } from '../store';
import { homePageThunk } from '../thunk/homePageThunk';

type initialStateType = {
  movieData: {
    trendingMoviesList:MovieModel[],
    PopularMoviesList: MovieModel[],
    RecommendedMoviesList: MovieModel[],
    MoviesCategory: MoviesCategory[],
    TopRatedMoviesList: MovieModel[],
  }
  , tvShowsData: {
     trendingTVLists:TvSHowModel[],
      popularTvList: TvSHowModel[],
        recommendedTvList:TvSHowModel[],
        topRatedTvList:TvSHowModel[],
        tvCategories:TvCategory[],
  },
  cartoonsData: {
    cartoonTvShowslist: MovieModel[];
    cartoonMoviesList: MovieModel[];
  }

  status: string,
  error: SerializedError | null
}


const initialState: initialStateType = {
  movieData: {
    trendingMoviesList:[],
    PopularMoviesList: [],
    RecommendedMoviesList: [],
    MoviesCategory: [],
    TopRatedMoviesList: [],

  }
  , tvShowsData: {
    trendingTVLists:[],
      popularTvList: [],
      recommendedTvList:[],
      topRatedTvList:[],
      tvCategories:[],
},
cartoonsData: {
  cartoonTvShowslist: [],
  cartoonMoviesList: []
},

  status: "",
  error: null


}




export const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {

  },

  extraReducers(builder) {
    builder.addCase(homePageThunk.pending, (state) => {

      state.status = "loading";
      state.error = null;
    });
    builder.addCase(homePageThunk.fulfilled, (state, { payload }) => {
      // movies data
      state.movieData.PopularMoviesList = payload.moviesData.popularMoviesList;
      state.movieData.RecommendedMoviesList = payload.moviesData.recommendedMoviesList;
      state.movieData.TopRatedMoviesList = payload.moviesData.topRatedMoviesList;
      state.movieData.MoviesCategory = payload.moviesData.moviesCategories;

        // tv shows data 

      state.tvShowsData.popularTvList = payload.tvShowsData.popularTvList;
      state.tvShowsData.recommendedTvList = payload.tvShowsData.recommendedTvList;
      state.tvShowsData.topRatedTvList = payload.tvShowsData.topRatedTvList;
      state.tvShowsData.tvCategories = payload.tvShowsData.tvCategories;


      // cartoon data

      state.cartoonsData.cartoonMoviesList = payload.cartoonsData.cartoonMoviesList
      state.cartoonsData.cartoonTvShowslist = payload.cartoonsData.cartoonTvShowslist
      state.status = "sucssess";
      state.error = null;
    })

    builder.addCase(homePageThunk.rejected, (state, action) => {

      state.status = "failed";
      state.error = action.error;
    });
  },
})

export const homePageStatus = (state: RootState) =>
  state.homePageReducer;
export const homePageReducer = homePageSlice.reducer
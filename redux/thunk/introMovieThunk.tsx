import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIntroListMovies } from "../../axios/getters";
import { HomePageModel, RootModel, MovieModel } from './../../models/movieModel';


export const introMoviesThunk = createAsyncThunk<MovieModel[]>(
    "introMoviesThunk",async()=>{

      let response =  await getIntroListMovies()

      let result:MovieModel[] = response.data.body

      return result
    }
)


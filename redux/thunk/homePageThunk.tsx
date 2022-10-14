import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { HomePageRootModel, MoviesData } from "../../models/movieModel";
import { getHomePageData } from './../../axios/getters';



export const homePageThunk = createAsyncThunk <MoviesData>(
    "homePageThunk",
    
    async ()=>{
        
            let response:AxiosResponse<any, any> = await getHomePageData()
            let result: MoviesData = response.data.body.moviesData
                
            return result      
    }
)


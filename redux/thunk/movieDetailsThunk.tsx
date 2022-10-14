import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosResponse } from "axios"
import { getMovieDetails } from "../../axios/getters"
import { MovieDetailsModel, } from "../../models/movieModel"


export const movieDetailsThunk = createAsyncThunk (
    "movieDetailsThunk",
    
    async (movieID:number)=>{
        
            let response:AxiosResponse<any, any> = await getMovieDetails(movieID)
            let result: MovieDetailsModel = response.data
                
            return result      
    },{}
)
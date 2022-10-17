import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { HomePageModel } from "../../models/movieModel";
import { getHomePageData } from './../../axios/getters';



export const homePageThunk = createAsyncThunk <HomePageModel>(
    "homePageThunk",
    
    async ()=>{
        
            let response:AxiosResponse<any, any> = await getHomePageData()
            let result: HomePageModel = response.data.body
                
            return result      
    }
)


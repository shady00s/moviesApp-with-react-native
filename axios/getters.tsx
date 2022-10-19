
import { MoviesData } from '../models/movieModel';
import { axiosInstance } from './inestance';

 
 export const getHomePageData= async () =>{
           

            let data = await axiosInstance.get("/homePageData",{params:{movieID:550,tvID:321}})
             return data
    
 }

 export const getMovieDetails = async(movieId:number)=>{
    let data = await axiosInstance.get("/movieDetails",{params:{movieID:movieId}})
    return data
 }


 export const getIntroListMovies = async()=>{
   let data = await axiosInstance.get("/selectMoviesCategories")

   return data
 }
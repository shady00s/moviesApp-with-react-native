


    export interface MovieModel {
        adult: boolean;
        backdrop_path: string;
        genre_ids: number[];
        id: number;
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        poster_path: string;
        release_date: string;
        title: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
    }


    export interface MoviesCategory {
        id: number;
        name: string;
    }

    export interface MoviesData {
            trendingMoviesList: MovieModel[];
            popularMoviesList: MovieModel[];
            recommendedMoviesList: MovieModel[];
            topRatedMoviesList: MovieModel[];
            moviesCategories: MoviesCategory[];
        
        
    }

    export interface TVDataModel{
        popularTvList: TvSHowModel[],
        recommendedTvList:TvSHowModel[],
        topRatedTvList:TvSHowModel[],
        tvCategories:TvCategory[],
    }

 
    export interface HomePageModel{
        moviesData:MoviesData,
        tvShowsData: TVDataModel,
        cartoonsData:CartoonsData
    }

    export interface TvSHowModel {
        backdrop_path: string;
        first_air_date: string;
        genre_ids: number[];
        id: number;
        name: string;
        origin_country: string[];
        original_language: string;
        original_name: string;
        overview: string;
        popularity: number;
        poster_path: string;
        vote_average: number;
        vote_count: number;
    }

   

    export interface TvCategory {
        id: number;
        name: string;
    }

    export interface TvShowsData {
        popularTvList: TvSHowModel[];
        recommendedTvList: any[];
        topRatedTvList: TvSHowModel[];
        tvCategories: TvCategory[];
    }



    export interface CartoonsData {
        cartoonTvShowslist: MovieModel[];
        cartoonMoviesList: MovieModel[];
    }

    export interface Body {
        moviesData: MoviesData;
        tvShowsData: TvShowsData;
        cartoonsData: CartoonsData;
    }

    export interface RootModel {
        message: string;
        body: Body;
    }

    export interface geners{
        id:number,
        name:string
    }
    export interface productionCompanies  {
                 id: string,
                 logo_path: string,
                 name: string,
                 origin_country: string
    }


    export interface productionCountaries{
        iso_3166_1: string,
            name: string
    }
    export interface spokenLanguages{
        english_name: string,
            iso_639_1: string,
            name: string
    }

    export interface Trailer{
       
            iso_639_1: string
            iso_3166_1: string

            name: string
            key: string
            site:string
            size: number
            type: string
            official: boolean
            published_at: string
            id: string
        
    }

    export interface Casting {
     adult: boolean,
     gender: number,
     id: number,
     known_for_department: string,
     name: string,
     original_name: string,
     popularity: number,
     profile_path: string,
     cast_id: number,
     character: string,
     credit_id: string,
     order: number
    }
export interface SingleMovieModel {
    adult: boolean,
    backdrop_path: string,
    belongs_to_collection: null,
    budget: number,
    genres: geners[],
    trailers: Trailer[],
    casting:Casting[],
    homepage: string,
    id: number,
    imdb_id: string,
    original_language: string,
    original_title: string,
    overview:string,
    popularity: number,
    poster_path: string,
    production_companies: productionCompanies[],
    production_countries: productionCountaries[],


    release_date: string,
    revenue: number,
    runtime: number,
    spoken_languages:spokenLanguages [
        
    ],
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average:number,
    vote_count: number
}



export interface MovieDetailsModel {
    message: string,
    body:{
        movieDetails:SingleMovieModel,
        similarMovies:MovieModel[]
    }
}
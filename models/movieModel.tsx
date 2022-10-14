

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

    export interface    MoviesData {
        popularMoviesList: MovieModel[];
        recommendedMoviesList: MovieModel[];
        topRatedMoviesList: MovieModel[];
        moviesCategories: MoviesCategory[];
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

    export interface HomePageRootModel {
        message: string;
        body: Body;
    }




export interface MovieDetailsModel {
    message: string,
    body:{
        movieDetails:MovieModel,
        similarMovies:MovieModel[]
    }
}
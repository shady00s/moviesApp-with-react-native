import {configureStore} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { homePageReducer } from './slices/homePageSlice';
import { introMoviesReducer } from './slices/introMovieSlice';
import { movieDetailsReducer } from './slices/movieDetailsSlice';

export const store = configureStore({
    reducer: {
       homePageReducer:homePageReducer,
       movieDetailsReducer:movieDetailsReducer,
       introMoviesReducer:introMoviesReducer
    }
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useTypedSelector: TypedUseSelectorHook<
  RootState
> = useSelector;

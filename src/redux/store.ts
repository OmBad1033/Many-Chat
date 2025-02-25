'use client'
import {combineReducers, configureStore } from '@reduxjs/toolkit'
import AutomationReducer from './slices/automation'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { composeWithDevTools } from '@redux-devtools/extension';

const rootReducer = combineReducers({
    AutomationReducer //gives all reducer functions
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
    devTools: true 
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
import {configureStore }from '@reduxjs/toolkit'
import todoSlice from "./todos/todoSlice"
import thunk from 'redux-thunk'
export const store =configureStore({
    reducer: {
        todos: todoSlice

    },

});
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const getTodoAsync = createAsyncThunk('todo/getTodoAsync', async () => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
    return await res.data;
})

export const addTodoAsync=createAsyncThunk('todo/addTodoAsync', async (data) =>{
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`,data);
    return res.data;
})

export const toggleTodoAsync=createAsyncThunk('todo/toggleTodoAsync', async({id,data})=>{
    const res=await axios.patch(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`,data);
    return res.data;
})

export const removeTodoItemAsync=createAsyncThunk('todo/removeTodoItemAsync', async(id)=>{
    await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`)
    return id;
})

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        activeFilter: 'all',
        isLoading: false,
        error: null,
        addNewTodoLoading: false,
        addNewTodoError:null,
    },
    reducers: {
        // toggle: (state, action) => {
        //     const { id } = action.payload;
        //     const item = state.items.find(item => item.id === id);
        //     item.completed = !item.completed;
        // },
        // deletee: (state, action) => {
        //     const { id } = action.payload;
        //     const filtered = state.items.filter(item => item.id !== id);
        //     state.items = filtered;

        // },
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;

        },
        clearComplete: (state) => {
            const filtered = state.items.filter((item) => item.completed == false);
            state.items = filtered;
        }
    },
    extraReducers: {
        //getTodos
        [getTodoAsync.pending]: (state, action) => { //işlem bekliyorken 
            state.isLoading = true;
        },
        [getTodoAsync.fulfilled]: (state, action) => { // işlem yerine getirildiğinde
            state.items = action.payload;
            state.isLoading = false;
        },
        [getTodoAsync.rejected]: (state, action) => { //işlemde error varken 
            state.isLoading = false;
            state.error = action.error.message;
        },
        //addTodo
        [addTodoAsync.fulfilled]: (state, action) => {
            state.items.push(action.payload);
            state.addNewTodoLoading=false;

        },
        [addTodoAsync.pending]: (state, action) => {
           state.addNewTodoLoading=true;
        },
        [getTodoAsync.rejected]: (state, action) => { //işlemde error varken 
            state.addNewTodoLoading = false;
            state.error = action.error.message;
        },
        //toggle
        [toggleTodoAsync.fulfilled]: (state, action) => {
            const { id } = action.payload;
          const item = state.items.find(item => item.id === id);
           item.completed = !item.completed;
        },
        //removeTodoItemAsyn
        [removeTodoItemAsync.fulfilled]: (state, action) => {
            console.log(state.items);
            const { id } = action.payload;
            //const filtered = state.items.filter(item => item.id !== id);
            //   state.items = filtered;
            const index = state.items.findIndex(item => item.id !== id);
            state.items.splice(index, 1);
            console.log(state.items);
    

         }
        

    }

});

export const selectedTodos = (state) => state.todos.items;

export const selectFilteredTodos = (state) => {
    if (state.todos.activeFilter === 'all') {
        return state.todos.items;
    } return state.todos.items.filter((todo) =>
        state.todos.activeFilter === 'active' ?
            todo.completed === false : todo.completed === true
    )
}
export const selectedActiveFilter = (state) => state.todos.activeFilter;


export const { changeActiveFilter, clearComplete } = todoSlice.actions;
export default todoSlice.reducer;
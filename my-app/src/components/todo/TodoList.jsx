import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {  selectFilteredTodos, getTodoAsync,toggleTodoAsync,removeTodoItemAsync } from "../../redux/todos/todoSlice"


export default function TodoList() {


    const dispatch = useDispatch();
    const filteredTodos = useSelector(selectFilteredTodos);
    const isLoading = useSelector((state) => state.todos.isLoading);
    const error = useSelector((state) => state.todos.error);

    const handleToggle=async(id,completed) =>{
       await dispatch(toggleTodoAsync({id,data:{completed}}))
    }
    const handleDestroy=async(id) =>{
        await dispatch(removeTodoItemAsync(id));
     };

    useEffect(() => {
        dispatch(getTodoAsync());
    }, [dispatch]);

    if (isLoading) {
        return <div >
            Loading...
        </div>
    }
    if (error) {
        return <div >
            Error...
        </div>
    }

    return (
        <ul class="todo-list">

            {
                filteredTodos?.map((item) => (
                    <li key={item.id} className={item.completed ? 'completed' : ''}>
                        <div class="view">
                            <input class="toggle"
                                checked={item.completed}
                                type="checkbox"
                                onChange={() => handleToggle(item.id, !item.completed)} />
                            <label>{item.title}</label>

                            <button class="destroy" onClick={() => dispatch(handleDestroy({id: item.id}))}></button>
                        </div>
                    </li>
                ))
            }

        </ul>
    )
}

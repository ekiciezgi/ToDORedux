import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { changeActiveFilter, clearComplete, selectedTodos, selectedActiveFilter } from '../../redux/todos/todoSlice'

export default function ContentFooter() {

    const items = useSelector(selectedTodos)
    const itemsLeft = items.filter(item => !item.completed).length
    console.log(itemsLeft);

    const dispatch = useDispatch();

    const activeFilter = useSelector(selectedActiveFilter);

    return (
        <div>

            <footer class="footer">
                <span class="todo-count">
                    <strong>{itemsLeft}</strong> item{itemsLeft > 1 && 's'} left
                </span>

                <ul class="filters">
                    <li>
                        <a className={activeFilter == 'all' ? 'selected' : ''}
                            onClick={() => dispatch(changeActiveFilter('all'))}>All</a>
                    </li>
                    <li>
                        <a className={activeFilter == 'active' ? 'selected' : ''}
                            onClick={() => dispatch(changeActiveFilter('active'))}>Active</a>
                    </li>
                    <li>
                        <a className={activeFilter == 'completed' ? 'selected' : ''}
                            onClick={() => dispatch(changeActiveFilter('completed'))}>Completed</a>
                    </li>
                </ul>

                <button class="clear-completed" onClick={() => dispatch(clearComplete())}>
                    Clear completed
                </button>
            </footer>

        </div>
    )
}

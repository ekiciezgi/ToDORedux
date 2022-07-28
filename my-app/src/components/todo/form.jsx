import React, { useState } from 'react'
import { useDispatch,useSelector} from 'react-redux'
import { addTodoAsync} from '../../redux/todos/todoSlice'
export default function Form() {

  const [title, setTitle] = useState('');
  const dispatch=useDispatch();
  const isLoading=useSelector((state) => state.todos.addNewTodoLoading);

  const handleSubmit = async (e) => {
    if(!title) return;
    e.preventDefault(); //native davranış durması için (sayfa yenilenmemesi)
     
    await dispatch(addTodoAsync({title}))
    setTitle('')
  }

  return (
    
      <form onSubmit={handleSubmit} style={{display:'flex',alignItems: 'center'}}>
        <input class="new-todo"
         placeholder="What needs to be done?"
         autoFocus value={title} onChange={(e)=>setTitle(e.target.value)}
          />
          { isLoading&&
                  <span style={{paddingRight:'10px'}}>Loading...</span>

          }
      </form>
    
  )
}

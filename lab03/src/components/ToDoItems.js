import React, { useState } from 'react';
import TodoForm from './ToDoForm';


const ToDoItems = () =>{
    const [todos, setTodos] = useState([])
    //const [input, setInput] = useState("")

    /*const handleSubmit = (event) =>{
        event.preventDefault()
        alert('An element was added to list ' + event.target.value);
        setTodos(todos => [...todos, event.target.value])
    }*/
    return(
        <div>
            <h2>ToDoItems</h2>
            <ul>{todos}</ul>
            <label>
                <TodoForm handleSetTodos={setTodos}></TodoForm>
            </label>
        </div>
    )
}
export default ToDoItems;
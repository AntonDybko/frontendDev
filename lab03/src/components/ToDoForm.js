import { useState } from 'react';
import FormToDoData from './FormToDoData';
import FormToDoMessage from './FormToDoMessage';
import FormToDoItem from './FormToDoItem';
import validator from 'validator'

const TodoForm = (props) => {
    const [item, setItem]= useState("");
    const [data, setData]= useState("");

    const handleSubmit = (event) =>{
        event.preventDefault()
        alert('An element was added to list ' + (item + ", " + data));
        props.handleSetTodos(todos => [...todos, (<div key={item}>{item}, {data}</div>)]);
        //testing /clear, why doesn't work?
        setItem("")
        setData("")
    }
    /*const checkError = (event) =>{
        event.preventDefault()
        if (validator.isDate(data) && item != "") {
            handleSubmit(event)
        } else {

        }
    }*/

    return(
        <label>
            <FormToDoItem handleValueItemChange = {setItem} value={item} ></FormToDoItem>
            <FormToDoData handleValueDataChange = {setData} value={data}></FormToDoData>
            <button type="submit" onClick={handleSubmit} >Add to list</button>
            <div>
                <FormToDoMessage></FormToDoMessage>
            </div>
        </label>
    )
}
export default TodoForm;
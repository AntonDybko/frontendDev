import { useState } from 'react';
import FormToDoData from './FormToDoData';
import FormToDoMessage from './FormToDoMessage';
import FormToDoItem from './FormToDoItem';


const TodoForm = (props) => {
    const [item, setItem]= useState("");
    const [data, setData]= useState("");
    const [dataerror, setDataValidationError] = useState("")
    const [message, setMessage] = useState("")
    //const [isclicked, toggleClick] = useState(false)

    const handleSubmit = (event) =>{
        event.preventDefault()
        if(data ==="" && item ===""){
            setMessage("Empty data and item")
        }else{
            //console.log("data: " + data +", item:"+ item +", message: " + message + ", dataerror: " + dataerror)
            if(dataerror !== "" && data !== "" && item !==""){
                setMessage(dataerror)
            }
            if(dataerror !== "" && data !== "" && item ===""){
                setMessage("1)" + dataerror +" 2) Empty item")
            }
            if(dataerror === "" && data !== "" && item ===""){
                setMessage("Empty item")
            }
            if(dataerror === "" && data === "" && item !==""){
                setMessage("Empty data")
            }
            if(data !== "" && item !=="" && message === "" && dataerror ===""){
                alert('An element was added to list ' + (item + ", " + data));
                props.handleSetTodos(todos => [...todos, (<div key={item}>{item}, {data}</div>)]);
                setItem("")
                setData("")
                console.log(item, data)
            }
        }
        //testing /clear, why doesn't work?
        //setItem("")
        //setData("")
        //testingerrors
        //toggleClick(false)
    }

    return(
        <label>
            <FormToDoItem handleValueItemChange = {setItem} handleClearErrors = {setMessage} value={item} ></FormToDoItem>
            <FormToDoData handleValueDataChange = {setData} handleValErrors = {setDataValidationError}  handleClearErrors = {setMessage} value={data}></FormToDoData>
            <button type="submit" onClick={handleSubmit} >Add to list</button>
            <div>
                <FormToDoMessage value={message}></FormToDoMessage>
            </div>
        </label>
    )
}
export default TodoForm;
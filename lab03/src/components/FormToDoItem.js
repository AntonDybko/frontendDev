import TodoForm from "./ToDoForm";

const FormToDoItem = (props) =>{
    const handleValueChange = (event) =>{
        props.handleValueItemChange(event.target.value)
    }
    return(
        <div>
            <div>Item: <input type="text" onChange={handleValueChange}></input></div>
        </div>
    )
}
export default FormToDoItem;
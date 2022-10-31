

const FormToDoItem = (props) =>{
    const handleValueChange = (event) =>{
        props.handleValueItemChange(event.target.value)
        props.handleClearErrors("")
    }
    return(
        <div>
            <div>Item: <input type="text" onChange={handleValueChange} value = {props.value}></input></div>
        </div>
    )
}
export default FormToDoItem;
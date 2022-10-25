const FormToDoData = (props) =>{
    const handleValueChange = (event) =>{
        props.handleValueDataChange(event.target.value)
    }
    return(
        <div>
            <div>Data: <input type="text" onChange={handleValueChange}></input></div>
        </div>
    )
}
export default FormToDoData;
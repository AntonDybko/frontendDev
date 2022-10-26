const FormToDoData = (props) =>{
    const handleValueChange = (event) =>{
        if (!validator.isDate(data)) {
            props.handleValErrors("Validation error")
        }else{
            props.handleValErrors("")
        }
        props.handleValueDataChange(event.target.value)
    }
    /*const checkError = (event) =>{
        event.preventDefault()
        if (validator.isDate(data) && item != "") {
            handleSubmit(event)
        } else {

        }
    }*/
    return(
        <div>
            <div>Data: <input type="text" onChange={handleValueChange} value={data}></input></div>
        </div>
    )
}
export default FormToDoData;
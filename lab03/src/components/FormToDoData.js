import validator from 'validator'
import moment from 'moment/moment'

const FormToDoData = (props) =>{
    const handleValueChange = (event) =>{
        //props.handleValueDataChange(event.target.value)
        //console.log(event.target.value)
        //console.log(props.value)
        if (validator.isDate(event.target.value)) {
        //if (moment(props.value, "YYYY-MM-DD", true).isValid()) {
            props.handleValueDataChange(event.target.value)
            props.handleValErrors("")
        }else{
            props.handleValErrors("Validation error")
        }
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
            <div>Data: <input type="text" onChange={handleValueChange}></input></div>
        </div>
    )
}
export default FormToDoData;
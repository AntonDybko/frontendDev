import validator from 'validator'
//import moment from 'moment/moment'

const FormToDoData = (props) =>{
    const handleValueChange = (event) =>{
        console.log(event.target.value)
        props.handleValueDataChange(event.target.value)
        props.handleClearErrors("")
        /*if(event.target.value ===""){
            props.handleValErrors("Empty data")
        }else{*/
        if (validator.isDate(event.target.value)) {
            if(event.target.value > getCurrentDate()){
                //props.handleValueDataChange(event.target.value)
                props.handleValErrors("")
            }else{
                props.handleValErrors("Plan you future!")
            }
        }else{
            props.handleValErrors("Validation error")
        }
        //}
    }
    const getCurrentDate = (separator='/') =>{
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}`
    }
    return(
        <div>
            <div>Data: <input type="text" onChange={handleValueChange} value = {props.value}></input></div>
        </div>
    )
}
export default FormToDoData;
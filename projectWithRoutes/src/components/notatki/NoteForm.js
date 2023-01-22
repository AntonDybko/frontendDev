import React from 'react';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import {
    asyncAddNote
} from '../../features/counter/gamesSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validate = (values) => {
    const errors = {};
    if(!values.tresc){
        errors.tresc = 'Required';
    }else if(values.tresc.length > 20 || values.tresc.length ===1) {
        errors.tresc = 'Must be more then 1 character and less then 20';
    }
    if(!values.mark){
        errors.mark = 'Required'
    }else if(isNaN(values.mark)) {
        errors.mark = 'Must be a number';
    }else if(parseInt(values.mark) > 10 || parseInt(values.mark) < 1) {
        errors.mark = 'Must be greater then 1 character and less then 10';
    }
    return errors;
}
const NoteForm = (props) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {id: '' , data: '', tresc: '', mark: ''},
        onSubmit: (values, {resetForm}) => {
            toast.success(`Note with id (${values.id}) added!`)
            values.id = uuidv4()
            values.data = (new Date()).getTime();

            const note = {
                id: values.id,
                data: values.data,
                tresc: values.tresc,
                mark: parseInt(values.mark)
            }
            dispatch(asyncAddNote(props.game, note))
            resetForm()

        },
        validate,
        validateOnChange: false,
        validateOnBlur: false,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <h4>Add note</h4>
            <label>tresc</label>
            <div>
                <input type='text' name='tresc' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.tresc}/>
            </div>
            {formik.errors.tresc ? <div>{formik.errors.tresc}</div> : null}

            <label>mark</label>
            <div>
                <input type='text' name='mark' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.mark}/>
            </div>
            {formik.errors.mark ? <div>{formik.errors.mark}</div> : null}

            <div>
                <button type='submit'>Submit</button>
            </div>
            <ToastContainer />
            <hr/>
        </form>
    )
}

export default NoteForm
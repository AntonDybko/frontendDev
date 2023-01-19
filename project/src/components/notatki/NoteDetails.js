import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import axios from "axios";
import {
    handleNote
} from '../../features/counter/counterSlice';

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

const NoteDetails = (props) => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: { data: props.note.data, tresc: props.note.tresc, mark: props.note.mark},
        onSubmit: values => {
            values.data = (new Date()).getTime();
            let newNote = {
                id: props.note.id,
                data: values.data,
                tresc: values.tresc,
                mark: parseInt(values.mark),
            }
            const newNotes = props.game.notes.map(note =>{
                if(note.id !== props.note.id){
                    return note;
                }else{
                    return {
                        newNote
                    }
                }
            })
            const action = {
                id: props.game.id,
                newNotes: newNotes
            }
            axios
            .put(`http://localhost:8080/${props.game.id}/${props.note.id}`, newNote)
            .then(res => {
                console.log(res.status, res.data)
                if(res.status === 200){
                    dispatch(handleNote(action))
                }else{
                    //allet?tost?
                } 
            })
            //dispatch(handleNote(action))
        },
        validate,
        validateOnChange: false,
        validateOnBlur: false,
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div>Id: {props.note.id}</div>
                <label>tresc</label>
                <div>
                    <input type='text' name='tresc' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.tresc} />
                </div>
                {formik.errors.tresc ? <div>{formik.errors.tresc}</div> : null}

                <label>mark</label>
                <div>
                    <input type='text' name='mark' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.mark} />
                </div>
                {formik.errors.mark ? <div>{formik.errors.mark}</div> : null}

                <div><button type="submit">Update</button></div>
            </form>
        </div>
    )
}

export default NoteDetails
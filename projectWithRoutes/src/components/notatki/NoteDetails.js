import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import {
    asyncUpdateNote
} from '../../features/counter/gamesSlice';
import { useLocation } from 'react-router-dom';

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

const NoteDetails = () => {
    const dispatch = useDispatch();
    const location = useLocation()
    const { currgame, currnote } = location.state
    const formik = useFormik({
        initialValues: { data: currnote.data, tresc: currnote.tresc, mark: currnote.mark},
        onSubmit: values => {
            alert("Note updated");
            values.data = (new Date()).getTime();
            let newNote = {
                id: currnote.id,
                data: values.data,
                tresc: values.tresc,
                mark: parseInt(values.mark),
            }
            const newNotes = currgame.notes.map(note =>{
                if(note.id !== currnote.id){
                    return note;
                }else{
                    return newNote
                }
            })
            dispatch(asyncUpdateNote(currgame.id, newNote, newNotes))

        },
        validate,
        validateOnChange: false,
        validateOnBlur: false,
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div>Id: {currnote.id}</div>
                <div>Date: {currnote.data}</div>
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
import React from 'react';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import {
    decrement,
    addToState,
    /*incrementByAmount,
    incrementAsync,
    incrementIfOdd,*/
    selectCount,
  } from '../features/counter/counterSlice';

const CompGameForm = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {id: '', author: '', name: '', price: '', description: '', system_requirements: '', notes: []},
        handleReset: initialValues => {
            initialValues.name = '';
            initialValues.price = '';
            initialValues.author = '';
            initialValues.description = '';
            initialValues.system_requirements = '';
            console.log("reset")
        },
        onSubmit: values => {
            alert("Dodano");
            values.id = uuidv4()
            console.log(JSON.stringify(values, null, 2));
            dispatch(addToState(
                {
                    id: values.id,
                    author: values.author,
                    name: values.name,
                    price: values.price,
                    description: values.description,
                    system_requirements: values.system_requirements,
                    notes: values.notes
                }
            ))
            values.name='';
            values.price='';
            values.author='';
            values.description='';
            values.system_requirements='';

        }
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <label>author</label>
            <div>
                <input type='author' name='author' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.author}/>
            </div>
            <label>name</label>
            <div>
                <input type='name' name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}/>
            </div>
            <label>price</label>
            <div>
                <input type='price' name='price' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.price}/>
            </div>
            <label>description</label>
            <div>
                <input type='description' name='description' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.description}/>
            </div>
            <label>system requirements</label>
            <div>
                <input type='system_requirements' name='system_requirements' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.system_requirements}/>
            </div>
            <div>
                <button type='submit'>Submit</button>
                <button type='reset' onClick={formik.handleReset}>Reset</button>
            </div>
        </form>
    )
}


export default CompGameForm
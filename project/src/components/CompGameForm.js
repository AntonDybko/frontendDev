import React from 'react';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import axios from "axios";
import {
    addToState,
  } from '../features/counter/counterSlice';

const validate = (values) => {
    const errors = {};
    if(!values.title){
        errors.title = 'Required';
    }else if(values.title.length > 20 || values.title.length ===1) {
        errors.name = 'Must be more then 1 character and less then 20';
    }
    if(!values.freetogame_profile_url){
        errors.freetogame_profile_url = 'Required'
    }
    if(!values.game_url){
        errors.game_url = 'Required'
    }
    if(!values.genre){
        errors.genre = 'Required'
    }
    if(!values.platform){
        errors.platform = 'Required'
    }
    if(!values.publisher){
        errors.publisher = 'Required'
    }
    if(!values.short_description){
        errors.short_description = 'Required'
    }else if(values.short_description.length > 120 || values.short_description.length ===1) {
        errors.short_description = 'Must be more then 1 character and less then 60';
    }
    if(!values.release_date){
        errors.release_date = 'Required'
    }
    if(!values.thumbnail){
        errors.thumbnail = 'Required'
    }
    return errors;
}
const CompGameForm = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {id: '', freetogame_profile_url: '', title: '', game_url: '', genre: '', platform: '', publisher: '', release_date: '', short_description: '', thumbnail: null, notes: []},
        handleReset: ({resetForm}) => {
            resetForm({values: ''})
        },
        validate,
        onSubmit: (values, {resetForm}) => {
            alert("Dodano");
            values.id = uuidv4()
            console.log(JSON.stringify(values, null, 2));
            let newgame = {
                id: values.id,
                freetogame_profile_url: values.freetogame_profile_url, 
                title: values.title, 
                game_url: values.game_url, 
                genre: values.genre, 
                platform: values.platform, 
                publisher: values.publisher, 
                release_date: values.release_date, 
                short_description: values.short_description,
                thumbnail: values.thumbnail,
                notes: []
            }
            axios.post(`http://localhost:8080/`, newgame).then(res => {
                console.log(res.status, res.data)
                if(res.status === 201){
                    dispatch(addToState(newgame))
                    resetForm({values: ''})
                }else{
                    //allet?tost?
                }
            })

        },
        validateOnChange: false,
        validateOnBlur: false,
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <label>title</label>
            <div>
                <input type='title' name='title' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} />
            </div>
            {formik.errors.title ? <div>{formik.errors.title}</div> : null}

            <label>freetogame profile_url</label>
            <div>
                <input type='url' name='freetogame_profile_url' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.freetogame_profile_url} />
            </div>
            {formik.errors.freetogame_profile_url ? <div>{formik.errors.freetogame_profile_url}</div> : null}

            <label>game_url</label>
            <div>
                <input type='url' name='game_url' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.game_url} />
            </div>
            {formik.errors.game_url ? <div>{formik.errors.game_url}</div> : null}

            <label>genre</label>
            <div>
                <input type='text' name='genre' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.genre} />
            </div>
            {formik.errors.genre ? <div>{formik.errors.genre}</div> : null}

            <label>platform</label>
            <div>
                <input type='text' name='platform' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.platform} />
            </div>
            {formik.errors.platform ? <div>{formik.errors.platform}</div> : null}

            <label>publisher</label>
            <div>
                <input type='text' name='publisher' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.publisher} />
            </div>
            {formik.errors.publisher ? <div>{formik.errors.publisher}</div> : null}

            <label>release_date</label>
            <div>
                <input type='date' name='release_date' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.release_date} />
            </div>
            {formik.errors.release_date ? <div>{formik.errors.release_date}</div> : null}

            <label>short description</label>
            <div>
                <input type='text' name='short_description' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.short_description} />
            </div>
            {formik.errors.short_description ? <div>{formik.errors.short_description}</div> : null}

            <label>image</label>
            <div><img src={formik.values.thumbnail}></img></div>
            <div><input className="imginput" type='file' name='thumbnail' onChange={e =>{
                const fileReader = new FileReader();
                fileReader.onload = () => {
                    if (fileReader.readyState === 2) {
                    formik.setFieldValue('thumbnail', fileReader.result);
                    }
                };
                fileReader.readAsDataURL(e.target.files[0]);
            }} onBlur={formik.handleBlur}/></div>
            {formik.errors.thumbnail ? <div>{formik.errors.thumbnail}</div> : null}
            <div>
                <button type='submit'>Submit</button>
                <button type='reset' onClick={formik.handleReset}>Reset</button>
            </div>
        </form>
    )
}


export default CompGameForm
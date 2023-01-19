import React from 'react';
import { useFormik } from 'formik';
import NoteList from './notatki/NoteList';
import NoteForm from './notatki/NoteForm';
import { useDispatch } from 'react-redux';
import axios from "axios";
//import * as Yup from 'yup';
import {
    Routes,
    Route,
    Link
} from "react-router-dom";
import {
    updateGame,
    asyncUpdateGame
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
        errors.short_description = 'Must be more then 1 character and less then 120';
    }
    if(!values.release_date){
        errors.release_date = 'Required'
    }
    if(!values.thumbnail){
        errors.thumbnail = 'Required'
    }else if(values.thumbnail.size > 1024*1024) {
        errors.thumbnail = 'Image is too big';
    }
    return errors;
}

const CompGameUpdate = (props) => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            id: props.game.id ,
            freetogame_profile_url: props.game.freetogame_profile_url, 
            title: props.game.title, 
            game_url: props.game.game_url, 
            genre: props.game.genre, 
            platform: props.game.platform, 
            publisher: props.game.publisher, 
            release_date: props.game.release_date, 
            short_description: props.game.short_description,
            thumbnail: props.game.thumbnail,
            notes: props.game.notes
        },
        //validationSchema: SignupSchema,
        validate,
        onSubmit: async values => {
            alert("Updated");
            //console.log(JSON.stringify(values, null, 2));
            let action = {
                id: props.game.id,
                selected_game: {
                    freetogame_profile_url: values.freetogame_profile_url, 
                    title: values.title, 
                    game_url: values.game_url, 
                    genre: values.genre, 
                    platform: values.platform, 
                    publisher: values.publisher, 
                    release_date: values.release_date, 
                    short_description: values.short_description,
                    thumbnail: values.thumbnail,
                }
            }
            dispatch(asyncUpdateGame(props.game.id, action.selected_game))

        },
        validateOnChange: false,
        validateOnBlur: false,
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div>Id : {props.game.id}</div>
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
                <div>{formik.values.short_description}</div>
                <div>
                    <input type='text' name='short_description' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.short_description} />
                </div>
                {formik.errors.short_description ? <div>{formik.errors.short_description}</div> : null}

                <label>image</label>
                <div><img className="thumbnail" src={formik.values.thumbnail}></img></div>
                <div><input className='imginput' type='file' name='thumbnail' onChange={e =>{
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                      if (fileReader.readyState === 2) {
                        formik.setFieldValue('thumbnail', fileReader.result);
                      }
                    };
                    fileReader.readAsDataURL(e.target.files[0]);
                    //formik.setFieldValue('thumbnail', e.target.files[0]);
                }} onBlur={formik.handleBlur} accept="image/png, image/jpeg, image/jpg"/></div>
                {formik.errors.thumbnail ? <div>{formik.errors.thumbnail}</div> : null}
                
                <div><button type="submit">Update</button></div>
            </form>
            <h3>Notes</h3>
            <Link to={`notes`}>View notes</Link>
            <Routes>
                <Route path={`notes/*`} element={
                    <div>
                        <NoteList game={props.game}/>
                        <NoteForm game={props.game}/>
                    </div>
                }/>
            </Routes>
            <hr/>
        </div>
    )
}

export default CompGameUpdate
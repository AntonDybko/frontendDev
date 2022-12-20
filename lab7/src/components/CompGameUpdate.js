import React from 'react';
import { useFormik } from 'formik';
import NoteList from './notatki/NoteList';
import NoteForm from './notatki/NoteForm';
import { useDispatch } from 'react-redux';
import {
    Routes,
    Route,
    Link
} from "react-router-dom";
import {
    updateGame
} from '../features/counter/counterSlice';

const CompGameUpdate = (props) => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {id: props.game.id , author: props.game.author, name: props.game.name, price: props.game.price, description: props.game.description, system_requirements: props.game.system_requirements, notes: props.game.notes},
        onSubmit: values => {
            alert("Updated");
            console.log(JSON.stringify(values, null, 2));
            let action = {
                id: props.game.id,
                selected_game: {
                    author: values.author,
                    name: values.name,
                    price: values.price,
                    description: values.description,
                    system_requirements: values.system_requirements
                }
            }
            dispatch(updateGame(action))

        }
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div>Id : {props.game.id}</div>
                <label>author</label>
                <div>
                    <input type='author' name='author' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.author} />
                </div>
                <label>name</label>
                <div>
                    <input type='name' name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
                </div>
                <label>price</label>
                <div>
                    <input type='price' name='price' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.price} />
                </div>
                <label>description</label>
                <div>
                    <input type='description' name='description' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.description} />
                </div>
                <label>system requirements</label>
                <div>
                    <input type='system_requirements' name='system_requirements' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.system_requirements} />
                </div>
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
        </div>
    )
}

export default CompGameUpdate
import React from 'react';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import {
    addNote
} from '../../features/counter/counterSlice';

const NoteForm = (props) => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {id: '' , data: '', tresc: ''},
        onSubmit: values => {
            values.id = uuidv4()
            values.data = (new Date()).getTime();
            console.log(JSON.stringify(values, null, 2));
            const action = {
                note: {
                    id: values.id,
                    data: values.data,
                    tresc: values.tresc
                },
                game: props.game
            }
            dispatch(addNote(action))
            /*props.handleGameNotes(games => games.map(game => {
                if(game.id === props.game.id){
                    return {
                        id: props.game.id,
                        author: props.game.author,
                        name: props.game.name,
                        price: props.game.price,
                        description: props.game.description,
                        system_requirements: props.game.system_requirements,
                        notes: [...props.game.notes, {
                            id: values.id,
                            data: values.data,
                            tresc: values.tresc
                        }]
                    }
                }else{
                    return game
                }
            }))*/
            values.tresc='';

        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <h4>Add note</h4>
            <label>tresc</label>
            <div>
                <input type='tresc' name='tresc' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.tresc}/>
            </div>
            <div>
                <button type='submit'>Submit</button>
            </div>
        </form>
    )
}

export default NoteForm
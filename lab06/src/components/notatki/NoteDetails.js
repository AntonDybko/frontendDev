import React from 'react';
import { useFormik } from 'formik';

const NoteDetails = (props) => {
    const formik = useFormik({
        initialValues: {id: '' , data: '', tresc: ''},
        onSubmit: values => {
            values.data = (new Date()).getTime();
            const newNotes = props.game.notes.map(note =>{
                if(note.id !== props.note.id){
                    return note;
                }else{
                    return {
                        id: props.note.id,
                        data: values.data,
                        tresc: values.tresc
                    }
                }
            })
            props.handleGameNotes(games => games.map(game =>{
                if(game.id !== props.game.id){
                    return game;
                }else{
                    return {
                        id: game.id,
                        author: game.author,
                        name: game.name,
                        price: game.price,
                        description: game.description,
                        system_requirements: game.system_requirements,
                        notes: newNotes
                    }
                }
            }))

        }
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div>Id: {props.note.id}</div>
                <label>treść</label>
                <div>
                    <input type='tresc' name='tresc' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.tresc} />
                </div>
                <div><button type="submit">Update</button></div>
            </form>
        </div>
    )
}

export default NoteDetails
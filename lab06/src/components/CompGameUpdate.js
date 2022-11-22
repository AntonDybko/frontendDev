import React from 'react';
import { useFormik } from 'formik';

const CompGameUpdate = (props) => {
    const formik = useFormik({
        initialValues: {id: props.game.id , author: props.game.author, name: props.game.name, price: props.game.price, description: props.game.description, system_requirements: props.game.system_requirements},
        onSubmit: values => {
            alert("Updated");
            console.log(JSON.stringify(values, null, 2));
            props.handleChangeGame(games => games.map(game => {
                if(game.id === props.game.id){
                    return {
                        id: props.game.id,
                        author: values.author,
                        name: values.name,
                        price: values.price,
                        description: values.description,
                        system_requirements: values.system_requirements
                    }
                }else{
                    return game
                }
            }))

        }
    });
    return (
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
    )
}

export default CompGameUpdate
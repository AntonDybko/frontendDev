import React from 'react';
import { useFormik } from 'formik';
import axios from "axios";
//import { UUID } from 'uuid-int';
//import { v4 as uuidv4 } from 'uuid';

const validate = (values) => {
    const errors = {};
    if(!values.name){
        errors.name = 'Required';
    }else if(values.name.length > 20 || values.name.length ===1) {
        errors.name = 'Must be more then 1 character and less then 20';
    }

    if(!values.email){
        errors.email = 'Required'
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
}

const CommentForm = (props) => {
    const formik = useFormik({
        initialValues: {id: '', userid: '', name: '', email: '', body: ''},
        validate,
        handleReset: initialValues => {
            initialValues.name = '';
            initialValues.email = '';
            initialValues.body = '';
            console.log("reset")
        },
        onSubmit: values => {
            alert("Dodano");
            values.id = (new Date()).getTime();
            values.userid = ((new Date()).getTime())/500;
            console.log(JSON.stringify(values, null, 2));
            axios
                .post('https://jsonplaceholder.typicode.com/comments',{
                    postId: values.id,
                    id: values.userid,
                    name: values.name,
                    email: values.email,
                    body: values.body
                })
                .then(response => {
                    console.log(response.status)
                    if(response.status===201){
                        props.handleSetComments(comments => 
                            [...comments, {
                                postId: values.id,
                                id: values.userid,
                                name: values.name,
                                email: values.email,
                                body: values.body
                            }])
                        values.name='';
                        values.email='';
                        values.body='';
                        //read checker
                        /*props.handleSetNewCommentChecker(checker => (
                            console.log(checker)
                        ))*/
                    }
                })
        },
        validateOnChange: false,
        validateOnBlur: false,

        /*onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        }*/
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <label>Name</label>
            <div>
                <input type='name' name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}/>
            </div>
            {formik.errors.name ? <div>{formik.errors.name}</div> : null}
            <label>Email</label>
            <div>
                <input type='email' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
            </div>
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
            <label>Body</label>
            <div>
                <input type='body' name='body' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.body}/>
            </div>
            <div>
                <button type='submit'>Submit</button>
                <button type='reset' onClick={formik.handleReset}>Reset</button>
            </div>
        </form>
    );
}



export default CommentForm
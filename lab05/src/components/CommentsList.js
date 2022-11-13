import axios from "axios"
import { useEffect, useState } from "react"
import CommentForm from "./CommentForm";

const CommentsList = () => {
    const [comments, setComments] = useState([]);
    //const [newCommentChecker, setNewCommentChecker] = useState(0)

    useEffect( ()=>{
        axios
            .get('https://jsonplaceholder.typicode.com/comments')
            .then(response => setComments(response.data))
    }, [/*comments*/]);

    return (
        <div>
            <CommentForm handleSetComments={setComments}/>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>
                        <div>Email: {comment.email}</div>
                        <div>Name: {comment.name}</div>
                    </li>
                ))}
            </ul>
        </div>

    )
}

export default CommentsList
import {useState} from "react";
import axios from "axios";

const ProductForm = (props) =>{
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const [rate, setRate] = useState("")
    const [count, setCount] = useState("")

    const handleTitleChange = (event) =>{
        setTitle(event.target.value)
    }
    const handlePriceChange = (event) =>{
        setPrice(event.target.value)
    }
    const handleCategoryChange = (event) =>{
        setCategory(event.target.value)
    }
    const handleDescriptionChange = (event) =>{
        setDescription(event.target.value)
    }
    const handleImageChange = (event) =>{
        setImage(event.target.files[0])
    }
    const handleRatingRateChange = (event) =>{
        setRate(event.target.value)
    }
    const handleRatingCountChange = (event) =>{
        setCount(event.target.value)
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        axios
            .post('https://fakestoreapi.com/products', {
                name: name,
                price: price,
                category: category,
                description: description,
                image: image,
                rating: {
                    rate: rate,
                    count: count
                }
            })
            .then(response => {
                console.log(response.status)
                if(response.status===200){
                    props.setProducts(products => [...products, 
                        <li key={id}>
                            <div>Id: {id}</div>
                            <div>Title: {title}</div>
                            <div>Price: {title}</div>
                            <div>Category: {category}</div>
                        </li>
                    ])
                }
            })
            .catch(err => console.log(err))
    }
    
    return(
        <label>
            <div>Title:</div>
            <input type="text" onChange={handleTitleChange}></input>
            <div>Price:</div>
            <input type="text" onChange={handlePriceChange}></input>
            <div>Category:</div>
            <input type="text" onChange={handleCategoryChange}></input>
            <div>Description:</div>
            <input type="text" onChange={handleDescriptionChange}></input>
            <div>Image:</div>
            <input type="file" onChange={handleImageChange}></input>
            <div>
                Rating:
                <div>Rate:</div>
                <input type="text" onChange={handleRatingRateChange}></input>
                <div>Count:</div>
                <input type="text" onChange={handleRatingCountChange}></input>
            </div>
            <button type="submit" onClick={handleSubmit} >Add to list</button>
        </label>
    )
}
export default ProductForm
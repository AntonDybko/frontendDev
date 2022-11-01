import {useState, useEffect} from "react";
import axios from "axios";
import ProductForm from "./ProductForm";


const Main = () =>{
    const [products, setProducts] = useState([]);

    useEffect( () => {
        axios
            .get('https://fakestoreapi.com/products')
            .then(response => setProducts(response.data))
      }, [products]);
    
      return(
          <div>
            <ul>{products.map(item => (<li key={item.id}>
                    <div>Id: {item.id}</div>
                    <div>Title: {item.title}</div>
                    <div>Price: {item.price}</div>
                    <div>Category: {item.category}</div>
                </li>))}
            </ul>
            <ProductForm addProduct = {setProducts}/>
          </div>
      )
}
export default Main;
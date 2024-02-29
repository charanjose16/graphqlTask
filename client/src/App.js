import react, { useState } from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import './App.css';

const ADD_TODO = gql`
  mutation addTodo($name: String!, $image: String!, $price: Float!, $discount:Float!) {
    addTodo(name: $name, image: $image, price: $price, discount: $discount) {
      id
      name
      image
      price
      discount
    }
  }
`;
const DEL_TODO = gql`
  mutation deleteTodo($id:ID!) {
    deleteTodo(id: $id) 
  }
`;

const READ_TODO=gql`
query getTodos{
  getTodos{
    id 
    name
    image
    price
    discount
  }
}`;

function App() {
const [name,setName]=useState("")
const [image,setImage]=useState("")
const [price,setPrice]=useState(0)
const [discount,setDiscount]=useState(0)
const[addTodo]=useMutation(ADD_TODO)
const[deleteTodo]=useMutation(DEL_TODO)
const {loading,error,data,refetch}=useQuery(READ_TODO);

if(loading) return<p>loading...</p>
if(error) return<p>{error.message}</p>


const handleAddTodo = async () => {
  console.log("entered");
  console.log("Variables:", { name, image, price, discount });
  const numericPrice = parseFloat(price);
  const numericDiscount = parseFloat(discount);
  try {
    await addTodo({
      variables: { name, image, price:numericPrice ,discount:numericDiscount},
      refetchQueries:[{query:READ_TODO}],
    });
    setName("");
    setImage("");
    setPrice(0);
    setDiscount(0);
   
    console.log("Todo added successfully");
  } catch (error) {
    console.error("Error adding todo:", error.message);
  }
  
};


const handleDeleteTodo = async (id) => {
  try {
    await deleteTodo({
      variables: { id },
      refetchQueries: [{ query: READ_TODO }],
    });

    console.log("Todo deleted successfully");
  } catch (error) {
    console.error("Error deleting todo:", error.message);
  }
};

const discountPrice=(old_price,discount)=>{
  return (old_price-(old_price*discount)/100).toFixed(0);
}

  return (
    <div className="App">
    <div className="inputs-main">
      <div className="input-list"><label>Product Name:</label><input value={name}  onChange={(event)=>{setName(event.target.value)}}></input></div>
      <div className="input-list"><label>Image Url:</label><input value={image}  onChange={(event)=>{setImage(event.target.value)}}></input></div>
      <div className="input-list"><label>MRP:</label><input value={price}  onChange={(event)=>{setPrice(event.target.value)}}></input></div>
      <div className="input-list"><label>Discount %:</label><input value={discount} onChange={(event)=>{setDiscount(event.target.value)}}></input></div>
      <button onClick={handleAddTodo} className="add-butn">Add</button>
    </div>

        
          <div className="main-div">
          {data.getTodos.map((todo)=>( 
          <div className="grid-items">
              <img src={todo.image} width="240" height="240" style={{objectFit:"contain"}}></img>
              <h4 style={{fontWeight:"600",marginLeft:"15px",marginRight:"15px"}}>{todo.name}</h4>
              <div style={{display:"flex",flexDirection:"row",gap:"30px",alignItems:"center"}}><h5 className="mrp" style={{margin:"0"}}>MRP: Rs.{todo.price}</h5><h4 style={{color:"green",margin:"0"}}>{todo.discount}% off</h4></div>
              <h2 style={{margin:"0",marginTop:"6px"}}>Rs. {discountPrice(todo.price,todo.discount)}</h2>
              <div className="buttn" onClick={()=>{handleDeleteTodo(todo.id)}} >Remove</div>
          </div>
          ))}
               
          </div>
         
       
      
    </div>
  );
}

export default App;

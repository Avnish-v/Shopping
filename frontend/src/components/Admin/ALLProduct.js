import {React,useEffect,useState} from 'react'
import ProductItem from "./ProductItem"
const ALLProduct = (props) => {
const [data, setdata] = useState([]) 
const [update,setupdate]  =  useState("")
const fetchdata = async()=>{
let response  = await fetch(`http://localhost:8080/api/shop/items`)
response =  await response.json()
setdata(response.data)  
    }
    let updates = (id)=>{
      setupdate(id);
    }
useEffect(() => {
 fetchdata();
}, [update])
  return ( <> 
    <div className="container" >
						<div className="row">              
  {data.map((element)=>{
    
    return <div className="col-md-3 mx-4 my-3" key={element._id}>
      <ProductItem
    name = {element.name}
    price = {element.price}
    img = {element.img}
    description = {element.description}
    id = {element._id}
    brand={element.brand}
    stock ={element.stock}
    handle={updates}
    alt = 'internal server issue'
    />
    </div>
  })}
</div>
</div>

    </>
  )
}
export default ALLProduct;
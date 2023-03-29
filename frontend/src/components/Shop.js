import {React,useEffect,useState} from 'react'
import Item from './Item'
const Shop = (props) => {
const [data, setdata] = useState([]) 
const fetchdata = async()=>{
let response  = await fetch(`http://localhost:8080/api/shop/${props.link}`)
response =  await response.json()
setdata(response.data)  
    }
useEffect(() => {
 fetchdata();
}, [])
  return ( <> 
    <div className="container" >
						<div className="row">              
  {data.map((element)=>{
    
    return <div className="col-md-3 mx-4 my-3" key={element._id}>
      <Item 
    name = {element.name}
    price = {element.price}
    img = {element.img[0]}
    description = {element.description}
    id = {element._id}
    brand={element.brand}
    alt = 'internal server issue'
    />
    </div>
  })}
</div>
</div>

    </>
  )
}
export default Shop
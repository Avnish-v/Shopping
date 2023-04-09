import {React,useState,useEffect }from 'react'

import Details from './Details'
function ProductDet( props) {
  const [ID, setID] = useState([])
  const params = new URLSearchParams(window.location.search)
  let data = params.get('id')
 const  productdata =  async ()=>{
let response  =  await fetch(`http://localhost:8080/api/shop/productdata/?id=${data}`,{method : "GET" }) 
response  =  await response.json();
setID(response.data);

  }
 useEffect(() => {
  productdata();
 }, [])
  return (
    <>
    {ID.map((element)=>{ 
      {console.log(element)}
    return <div key={element._id}>
      <Details key={element._id} img = {element.img} brand={element.brand} price = {element.price}
      description = {element.description} id={element._id} name = {element.name} stock={element.stock}
      />
    </div>
})}


</>
  )
}

export default ProductDet
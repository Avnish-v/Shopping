import React from 'react'
import { useState,useEffect } from 'react'
import Item from './Item'

const Search = () => {
    const params = new URLSearchParams(window.location.search)
  let key = params.get('search')
    const [data, setdata] = useState([]) 
    let fetchdata =  async ()=>{
        let searchData =  await fetch(`http://localhost:8080/api/shop/search/${key}`,{method:"get"});
        searchData =  await searchData.json();
       setdata(searchData.data)  
    }
    useEffect(() => {
        fetchdata();
       }, [])
  return (
   <>
    <div className="container" >
						<div className="row">              
  {data.length !=0 ?data.map((element)=>{
    
    return <div className="col-md-3 mx-4 my-3" key={element._id}>
      <Item 
    name = {element.name}
    price = {element.price}
    img = {element.img}
    description = {element.description}
    id = {element._id}
    brand={element.brand}
    alt = 'internal server issue'
    />
    </div>
  }):<h1 className='center text-center'>Product Not Found <i class="fa fa-times" style={{color:"red"}} aria-hidden="true"></i>
  </h1>}
</div>
</div>
   
   </>
  )
}

export default Search
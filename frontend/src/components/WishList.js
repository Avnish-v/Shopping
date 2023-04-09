import {React,useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import Wishlisitem from './Wishlisitem'

const WishList = (props) => {
  const {data}  =  props
  const params = new URLSearchParams(window.location.search)
  let URLDATA = params.get('id')
  const [saveData, setsaveData] = useState([]);
  const remove = async (productId) => {
    let localstorage = localStorage.getItem('token');
    if(localstorage &&  productId){
      let response = await fetch(
        `http://localhost:8080/api/auth//wishlist/?token=${localstorage}&productId=${productId}`,
        {
          method: 'DELETE',
        }
        );
        response  =  await response.json();
        SendData();
    }
  };

  const SendData =  async ()=>{
    let localstorage = localStorage.getItem("token");
  let send =  await fetch(`http://localhost:8080/api/auth/wishlistCart/?token=${localstorage} `,{method :"GET",});
 let response =  await send.json();
 let data = response.reverse;
 data = data[0]
 let filteredData = [];
 data.forEach((element) => {
   // Check if productId already exists in the array
   if (!filteredData.find((item) => item.productId === element.productId)) {
     filteredData.push(element);
   }
 });
 setsaveData(filteredData);
  }
  //!this will be use on another page...
  const  productdata =  async ()=>{
    if(URLDATA){
      let localstorage = localStorage.getItem("token");
      let response  =  await fetch(`http://localhost:8080/api/auth/wishlist/?productId=${URLDATA}&token=${localstorage}`,{method : "post",})
      response = await response.json();
      console.log("the product added",response)
      SendData();
    }
      } 
     useEffect(() => {
       productdata();
SendData();
}, [])
  return (
    <>
    <section className="h-100" >
  <div className="container h-100 py-5">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-10">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-normal mb-0 text-dark">wishlist♥</h3>
        </div>
        {saveData.length != 0? saveData.map(element => {
       return <div className="card rounded-3 mb-4" key={element.productId} >  
       {console.log(element)}   
<Wishlisitem
productId={element.productId}
Name = {element.Name}
img = {element.img}
price = {element.price}
remove = {remove}
stock= {element.stock}
/>
</div>

}):<h1 className='center text-center'>Nothing in the WishList <i class="fa fa-times" style={{color:"red"}} aria-hidden="true"></i>
</h1> }
 <div className=' card-body center d-flex justify-content-center'><Link to="/"><button className='btn btn-warning btn-block btn-lg center'> Please Add  Items <i class="fa fa-shopping-bag" aria-hidden="true"></i>
  </button></Link></div>
</div>  
      </div>
    </div>
</section> 
   </>
  )
}
export default WishList 

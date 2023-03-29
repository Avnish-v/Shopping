import {React,useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import PayButton from './PayButton'

const AddToCart = () => {
 
  const params = new URLSearchParams(window.location.search)
  let URLDATA = params.get('id')
  const [saveData, setsaveData] = useState([]);
  const [quantity ,  setquantity] = useState(1);
  const handleChange = (event) => {

    setquantity(event.target.value);
    console.log("the value is changing",event.target.value);
    
  };
  const decrease = ()=>{
    let count = parseInt(quantity - 1);
    setquantity(count);
    productdata();
  }
  const increase = ()=>{
    let count = parseInt(quantity + 1);
    setquantity(count);
    productdata();
  }
  const  productdata =  async ()=>{
    if(URLDATA){
      let localstorage = localStorage.getItem("token");
      let response  =  await fetch(`http://localhost:8080/api/auth/cart?id=${URLDATA}&tk=${localstorage}&quantity=${quantity}}`,{method : "GET" }) 
      response  =  await response.json();
  
      // setsaveData(response.products)
    }
      }
      const SendData =  async ()=>{
        let localstorage = localStorage.getItem("token");
      let send =  await fetch(`http://localhost:8080/api/auth/updatedCart/?token=${localstorage} `,{method :"GET",});
      
     let response =  await send.json();
        let data = response.reverse;
        setsaveData(data[0])

      }
     useEffect(() => {
  productdata();
  SendData()
     }, [])

  return (
   <>
  <section className="h-100" style={{backgroundColor :"#eee"}}>
  <div className="container h-100 py-5">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-10">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
        </div>
       
        {saveData?saveData.map(element => {

return <div className="card rounded-3 mb-4"key={element.productId} >
<div className="card-body p-4">
  <div className="row d-flex justify-content-between align-items-center">
    <div className="col-md-2 col-lg-2 col-xl-2">
      <Link to={`/ProductDet/?id=${element.productId}`}>
      <img
        src={`http://localhost:3000${element.img[0].slice(18)}`}
        className="img-fluid rounded-3" alt="Cotton T-shirt"/>
    </Link>
    </div>
    <div className="col-md-3 col-lg-3 col-xl-3">
      <p className="lead fw-normal mb-2">{element.Name}</p>
      {/* <p><span className="text-muted">description </span> </p> */}
      
    </div>
    <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
      <button className="btn btn-link px-2"
        onClick={decrease}>
       <i className="fa fa-minus" aria-hidden="true"></i>

      </button>

      <input id="form1" min={1} name="quantity" onChange={handleChange}  value={quantity} type="text"
        className="form-control form-control-sm" />
      <button className="btn btn-link px-2"
        onClick={increase}>
        <i className="fa fa-plus" aria-hidden="true"></i>
      </button>
    </div>
    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
      <h5 className="mb-0">₹{element.price}</h5>
    </div>
    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
      <a  className="text-danger"><i className="fa fa-trash" aria-hidden="true"></i></a>
    </div>
  </div>
</div>
</div>  

}):<></>}
        <div className="card center">
          <div className="card-body">
            {/* <button type="button" className="btn btn-warning btn-block btn-lg">Proceed to Pay</button> */}
            <PayButton cartitem={saveData}/>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
   
   </>
  )
}

export default AddToCart
import {React,useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import CartItems from './CartItems'
import PayButton from './PayButton'

const AddToCart = () => {
 
  const params = new URLSearchParams(window.location.search)
  let URLDATA = params.get('id')
  const [saveData, setsaveData] = useState([]);
  const handleRemoveItem = (productId) => {
    setsaveData(prevState => prevState.filter(item => item.productId !== productId));
    SendData();
  };  
  
  const handleAddQuantity = (productId, newQuantity) => {
    setsaveData(prevState => prevState.map(item => {
      if (item.productId === productId) {
        return {...item, quantity: newQuantity};
      }
      return item;
    }));
    // SendData();
  };
  const  productdata =  async ()=>{
    if(URLDATA){
      let localstorage = localStorage.getItem("token");
      let response  =  await fetch(`http://localhost:8080/api/auth/cart?productId=${URLDATA}&id=${localstorage}`,{method : "get" }) 
     SendData(); }  }
      const SendData = async () => {
        let localstorage = localStorage.getItem("token");
        let send = await fetch(`http://localhost:8080/api/auth/updatedCart/?token=${localstorage}`, { method: "GET" });
        let response = await send.json();
        let data = response.reverse;
        let filteredData = [];
        data[0].forEach((element) => {
          if (!filteredData.find((item) => item.productId === element.productId)) {
            filteredData.push(element);
          }
        });
       filteredData = filteredData.reverse();
        setsaveData(filteredData);
      };
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
          <h3 className="fw-normal mb-0 text-black">Shopping Cart <i class="fa fa-shopping-cart" aria-hidden="true"></i>
</h3>
        </div>
        
        {saveData.length !== 0 ? saveData.map(element => {
          
          
return <div className="card rounded-3 mb-4"key={element.productId} >
<CartItems
img={element.img}
Name ={element.Name}
productId ={element.productId}
quantitys={element.quantity}
price = {element.price}
onRemoveItem={handleRemoveItem} 
handle ={handleAddQuantity}
stock = {element.stock}  />


</div>  

}):<h1 className="center text-center">
Nothing in the cart <i class="fa fa-times" style={{color: 'red'}} aria-hidden="true"></i>
</h1>}
        
          <div className="card-body center d-flex justify-content-center" >
            
            {saveData.length !=0 ?<PayButton cartitem={saveData}/> :<></>}
           <Link to='/'><button className='btn btn-warning btn-block btn-lg mx-2' > shop more <i class="fa fa-shopping-bag" aria-hidden="true"></i>
</button></Link> 
          </div>
        </div>

      </div>
    
  </div>
</section>
   
   </>
  )
}

export default AddToCart





//  
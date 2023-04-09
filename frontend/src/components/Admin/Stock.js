import {React,useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import Stockitem from './Stockitems'


const Stock = () => {
  const [saveData, setsaveData] = useState([]);
  const [Update , setUpdate] = useState("");
  let updates =(pid)=>{
    setUpdate(pid)
  }
  // const handleAddQuantity = (productId, newQuantity) => {
  //   setsaveData(prevState => prevState.map(item => {
  //     if (item.productId === productId) {
  //       return {...item, quantity: newQuantity};
  //     }
  //     return item;
  //   }));
  //   SendData();
  // };

      const SendData = async () => {
        let localstorage = localStorage.getItem("token");
        let send = await fetch(`http://localhost:8080/api/Admin/getOutOfStock`, { method: "GET" });
        let response = await send.json();
        console.log("res",response);
        let data = response.products;
        setsaveData(data);
      };
     useEffect(() => {
       SendData()
     }, [Update])

  return (
   <>
  <section className="h-100" style={{backgroundColor :"#eee"}}>
  <div className="container h-100 py-5">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-10">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <marquee><h3 className="fw-normal mb-0 text" style={{color:"red"}}><b>OUT OF STOCK</b> <i class="fa fa-times" style={{color:"red"}} aria-hidden="true"></i> </h3></marquee>

        </div>
        
        {saveData.length !== 0 ? saveData.map(element => {
          
          
return <div className="card rounded-3 mb-4"key={element.productId} >
<Stockitem
img={element.img}
Name ={element.name}
productId ={element._id}
price = {element.price}
handle ={updates}
stock = {element.stock}  />
</div>  

}):<h1 className="center text-center">
Nothing to refil the Stock <i class="fa fa-times" style={{color: 'red'}} aria-hidden="true"></i>
</h1>}
        </div>

      </div>
    
  </div>
</section>
   
   </>
  )
}

export default Stock;

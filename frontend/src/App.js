import Navbar from "./components/Navbar";
import Shop from "./components/Shop";
import AddToCart from "./components/AddToCart";
import WishList from "./components/WishList";
import Login from "./components/Login";
import SignUp from "./components/SignUp"
import ProductDet from "./components/ProductDet";
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Order from "./components/Order";
import About from "./components/About";
import CheckoutSucess from "./components/CheckoutSucess";
import Footer from "./components/Footer";
import Error from "./components/Error";
function App() {
  if(!localStorage.getItem("status")){
    localStorage.setItem("status","login")
  }
  return (
  <div >
  <Router>
    <Navbar />
    <Routes>
    <Route exact path="/" element={<Shop  key="items"  link="items" />}/>
<Route exact path="/checkout-sucess" element={<CheckoutSucess  />}/>
    <Route exact path="/login" element={<Login/>}/>
    <Route exact path="/Signup" element={<SignUp/>}/>
    {/* <Route exact path="/Admin" element={</Admin >{"}"}/> */}
    <Route exact path="/About" element={<About/>}/>
      <Route exact path="/Mens" element={<Shop  key="mens"  link="men"/>}/>
      <Route exact path="/Womens"  element={<Shop  key="womens" link="women"/>}/>
      <Route exact path="/Unisex"  element={<Shop  key="Unisex" link="unisex"/>}/>
       <Route exact path="/kids"  element={<Shop  key="kids" link="kids"/>}/>
       <Route exact path="/ProductDet/"  element={<ProductDet key={window.location.id}/>}/>
       <Route exact path="/AddToCart" element={<AddToCart  key={window.location.id}></AddToCart>}/>
       <Route exact path="/WishList" element={<WishList  key={window.location.id}></WishList>}/>
       <Route exact path="/order" element={<Order key={window.location.id}></Order>}/>
       <Route exact path="*" element={<Error/>}/>

    </Routes>
  
  <Footer/>
  </Router>
 
  </div>
  
  );
}

export default App;


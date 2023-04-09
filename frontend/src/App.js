import Navbar from "./components/Navbar";
import Shop from "./components/Shop";
import AddToCart from "./components/AddToCart";
import WishList from "./components/WishList";
import Login from "./components/Login";
import SignUp from "./components/SignUp"
import ProductDet from "./components/ProductDet";
import {BrowserRouter as Router,Routes,Route,Link,} from "react-router-dom";
import Order from "./components/Order";
import About from "./components/About";
import CheckoutSucess from "./components/CheckoutSucess";
import Footer from "./components/Footer";
import Error from "./components/Error";
import Search from "./components/Search";
import Stock from "./components/Admin/Stock";
import ALLProduct from "./components/Admin/ALLProduct";
import Admin from "./components/Admin/Admin";
import { useState,useEffect} from "react";

function App() {
  const [User, setUser] = useState('User');
  
  useEffect(() => {
    let role = localStorage.getItem("role");
    if (role) {
      setUser('Admin')
    } else {
      setUser('User')
    }
  }, [User]);
  
  const userRoutes = [
    { path: '/', element: <Shop key="items"  link="items" /> },
    { path: '/checkout-sucess', element: <CheckoutSucess /> },
    { path: '/signup', element: <SignUp /> },
    { path: '/about', element: <About /> },
    { path: '/search', element: <Search /> },
    { path: '/mens', element: <Shop  key="mens"  link="men" /> },
    { path: '/womens', element: <Shop  key="womens" link="women" /> },
    { path: '/unisex', element: <Shop  key="Unisex" link="unisex" /> },
    { path: '/kids', element: <Shop  key="kids" link="kids" /> },
    { path: '/productdet', element: <ProductDet key={window.location.id} /> },
    { path: '/addtocart', element: <AddToCart  key={window.location.id} /> },
    { path: '/wishlist', element: <WishList key={window.location.id} /> },
    { path: '/order', element: <Order /> },
    { path: '*', element: <Error /> },
  ];
  
  const adminRoutes = [
    { path: '/', element: <Admin  /> },
    {path : '/AllProduct', element: <ALLProduct key="items" link="items"/>},
    { path: '/outofstock', element: <Stock /> },
    { path: '*', element: <Error /> },
  ];
  
  const routes = User === 'Admin' ? adminRoutes : userRoutes;
  
  return (
    <div>
      <Router>
        <Navbar User={User} key={User} />
        <Routes>
        
        <Route path="/login" element={<Login/>}/>
          {routes.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

import {React,useState} from 'react'
import { useNavigate,Link } from "react-router-dom";
const host = "http://localhost:8080"
const Login = () => {
    let history = useNavigate();
    const [cardential, setcardential] = useState({ email: "", password: "" })
    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ "email": cardential.email[0], "password": cardential.password[0] })

        });


        const json = await response.json();
      
        if (json.result == true) {
            //save the aueyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDU2ZTc2Mzk3YjQ4YmEyOWZhODI1NSIsImlhdCI6MTY3MDE2MDk0NX0.rNa9gKeVbUwDeFjlBxqOpVy5KOrPWgilxXmZpE0FkGYth token
            localStorage.setItem('token',json.AuthToken );
            localStorage.setItem('status',"logout")
            history('/')
            alert("login successfully")

        } else if(json.result === "admin"){
          
          localStorage.setItem('token',json.AuthToken );
            localStorage.setItem('status',"logout")
            localStorage.setItem("role","Admin");
            history('/')
            alert("login successfully")
        }else
        {
          localStorage.setItem("status","login")
            alert("login unsuccessfully")
            // props.showAlert("please enter correct cardential", 'danger');
        }
    }    
    const OnChange = e => {
        setcardential({ ...cardential, [e.target.name]: [e.target.value] });
    };
  return (
    
 <>
 <section className="h-100 gradient-form" style={{backgroundColor: "#eee"}}>
 <div className="container py-5 h-100">
   <div className="row d-flex justify-content-center align-items-center h-100">
     <div className="col-xl-10">
       <div className="card rounded-3 text-black">
         <div className="row g-0">
           <div className="col-lg-6">
             <div className="card-body p-md-5 mx-md-4">

               <div className="text-center">
                
<img src='/website/logo.jpg'  style={{Width: "185px"}} alt="logo"/>
                 <h4 className="mt-1 mb-5 pb-1">We are The DressWel Team</h4>
               </div>

               <form  onSubmit={handlesubmit}>
                 <p>Please login to your account</p>

                 <div className="form-outline mb-4">
                   <input type="email" id="form2Example11 email"  name="email" className="form-control" value={cardential.email} onChange={OnChange}
                     placeholder="Phone number or email address" />
                   <label className="form-label" htmlFor="form2Example11">Username</label>
                 </div>

                 <div className="form-outline mb-4">
                   <input type="password" id="form2Example22  password" className="form-control" value={cardential.password} onChange={OnChange}  name="password"/>
                   <label className="form-label" htmlFor="form2Example22">Password</label>
                 </div>

                 <div className="text-center pt-1 mb-5 pb-1">
                   <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit" >Log
                     in</button>
                 
                 </div>

                 <div className="d-flex align-items-center justify-content-center pb-4">
                   <p className="mb-0 me-2">Don't have an account?</p>
                 
                
                   <Link to="/Signup"><button type="button" className="btn btn-outline-danger"> Create new    </button></Link>
                  
               
                 
                 </div>

               </form>

             </div>
           </div>
        
           
         </div>
       </div>
     </div>
   </div>
 </div>
</section></>
  )
}

export default Login
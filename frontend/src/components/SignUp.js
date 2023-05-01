import {React,useState,useEffect} from 'react'
import { useNavigate,Link } from "react-router-dom";
const host = "http://localhost:8080"
const SignUp = () => {
  let history =  useNavigate();
  const [register, setregister] = useState({username:"", password:"",email :"" ,address : "", phone:"" });
  const [errors, setErrors] = useState({});
  const handle   = async (e)=>{
    e.preventDefault();
    let res   =  await  fetch(`${host}/api/auth/create`,{
      method :"POST",
      headers:{
        "content-type":"application/json",  
      },
      body:JSON.stringify({"username":register.username[0], "password":register.password[0],"email" :register.email[0],"address" : register.address[0], "phone":register.phone[0]})
    });
    let backupdata  =  await res.json();
    console.log(backupdata);
    if (backupdata.result == true) {
      
      localStorage.setItem('token',backupdata.AuthToken );
      localStorage.setItem('status',"logout")
      history('/')
      alert("registered successfully")

  } else {
      alert("registeration unsuccessfully")
      localStorage.removeItem("status")

  }
}
   
  
  
const onChange = (e) => {
  const { name, value } = e.target;
  
  // add regex pattern and validation message for each input field
  const patterns = {
    username: /^[a-zA-Z ]{2,30}$/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    address: /^[a-zA-Z0-9\s,'-]*$/,
    phone: /^\d{10}$/
  }
  const messages = {
    username: "Name must contain only letters and spaces.",
    password: "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.",
    email: "Please enter a valid email address.",
    address: "Address must contain only letters, digits, spaces, commas, hyphens, and single quotes.",
    phone: "Phone number must be 10 digits long."
  }
  
  // validate the input field using regex pattern
  if (patterns[name] && !patterns[name].test(value)) {
    setErrors({ ...errors, [name]: messages[name] });
  } else {
    const newErrors = { ...errors };
    delete newErrors[name];
    setErrors(newErrors);
  }
  
  setregister({ ...register, [name]: [value] });
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
                 {/* <img src="/uploads/logo.jpg"
                   style="width: 185px;" alt="logo"/> */}
<img src='/website/logo.jpg'  style={{Width: "185px"}} alt="logo"/>
                 <h4 className="mt-1 mb-5 pb-1">We are The DressWel Team</h4>
               </div>
               <form  onSubmit={handle}>
                

                 <div className="form-outline mb-4">
                   <input type="text" id="form2Example11 name"  name="username" className="form-control" pattern="[A-Za-z]+" required value={register.name} onChange={onChange}
                     placeholder="please enter your name" />
                   <label className="form-label" htmlFor="form2Example11">Name</label>
                 </div>
                 <div className="form-outline mb-4">
                   <input type="email" id="form2Example11 email"  name="email" className="form-control" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required value={register.email} onChange={onChange}
                     placeholder="please enter your email id" />
                   <label className="form-label" htmlFor="form2Example11">Email</label>
                 </div>
                 <div className="form-outline mb-4">
                   <input type="text" id="form2Example11 address"  name="address" className="form-control" pattern="[0-9a-zA-Z\s,-]*$" value={register.address}  onChange={onChange}
                     placeholder="Address" />
                   <label className="form-label" htmlFor="form2Example11">Address</label>
                 </div>
                 <div className="form-outline mb-4">
                   <input type="phone" id="form2Example11 phone"  name="phone" className="form-control" pattern='\d{10}'  value={register.phone}onChange={onChange}
                     placeholder="Phone no." />
                   <label className="form-label" htmlFor="form2Example11">Phone NO.</label>
                 </div>


                 <div className="form-outline mb-4">
                   <input type="password" id="form2Example22  password" className="form-control" pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}' onChange={onChange} value={register.password} name="password"/>
                   <label className="form-label" htmlFor="form2Example22"> Set-Password</label>
                 </div>
                 {/* <div className="mb-3 ">
<label htmlhtmlfor='file' className="custom-file ">Profile</label>
<input type="file" className="custom-file-input form-control"    name="file" id="file" />
</div> */}

                 <div className="text-center pt-1 mb-5 pb-1">
                   <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type='submit' >register
                     </button>
                 </div>

                 <div className="d-flex align-items-center justify-content-center pb-4">
                   <p className="mb-0 me-2">Already have Account </p>
                 
                
                   <Link to="/Login"><button type="button" className="btn btn-outline-danger"> login   </button></Link>
                  
               
                 
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
export default SignUp;
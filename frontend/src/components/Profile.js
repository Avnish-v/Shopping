import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Profile.css";

const Profile = () => {
  const [data, setData] = useState({});
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8080/api/auth/UserD/?tk=${localStorage.getItem('token')}`);
      const responseData = await response.json();
      setData(responseData);
      setUsername(responseData.username);
      setAddress(responseData.address);
      setPhone(responseData.phone);
    };
    fetchData();
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);

  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/auth/change/?tk=${localStorage.getItem('token')}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          address,
          phone,
        }),
      });
      const responseData = await response.json();
      console.log(responseData.message)
      if(responseData.message === "User information updated successfully"){
        alert("sucessfully changed")
      }else{
        alert("something went wrong")
      }
      setData(responseData);
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container-xl px-4 mt-4">
        <nav className="nav nav-borders">
          <Link className="nav-link active ms-0" to="/profile">Profile</Link>
          <Link className="nav-link" to="/order">Order</Link>
          <Link className="nav-link" to="/addtocart">Cart</Link>
          <Link className="nav-link" to="/">Shop</Link>
        </nav>
        <hr className="mt-0 mb-4" />
        <div className="row">
          <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                <button className="btn btn-primary" type="button">Upload new image</button>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card mb-4">
              <div className="card-header">Account Details</div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputUsername">Username </label>
                    <input className="form-control" id="inputUsername" type="text" placeholder={username} onChange={handleUsernameChange} />
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLocation">Address</label>

                                <input class="form-control" id="inputLocation" type="text" placeholder={address} onChange={handleAddressChange} />
                            </div>
                        </div>
                        <div class="row gx-3 mb-3">
                           
                            <div class="col-md-6">
                                <label class="small mb-1" for="inputPhone">Phone number</label>
                                <input class="form-control" id="inputPhone" type="tel" placeholder={phone}  onChange={handlePhoneChange}/>
                            </div>
                        </div>
                        
                        <button class="btn btn-primary" type="submit">Save changes</button>
                        
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
    </>
  )
}

export default Profile
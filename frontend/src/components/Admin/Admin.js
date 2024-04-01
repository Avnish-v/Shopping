import React,{useEffect, useState} from 'react'

const Admin = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [gender, setGender] = useState('');
  const [type, setType] = useState('');
  const [stock, setStock] = useState('');
  const [file, setFile] = useState();
  const [alertmsg ,setalertmsg] = useState("")
const handleSubmit = async (e) => {

  e.preventDefault();

  let a = window.confirm("Do you real want to add this product please check details...");
  if(a){
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('brand', brand);
    formData.append('type', type);
    formData.append('gender', gender);
    formData.append('stock', stock);
    formData.append('price', price);
    for (let i = 0; i < file.length; i++) {
      formData.append('file', file[i]);
    }
  
    let postData = await fetch('http://localhost:8080/api/shop/backend', {
      method: 'POST',
      body: formData,
      headers: {
        'Auth-Token': localStorage.getItem('token'),
      },
    });
    postData = await postData.json();
    if(postData.result){
      setalertmsg("product added sucessfully...");
      e.target.reset();
      setName('');
      setDescription('');
      setPrice('');
      setBrand('');
      setGender('');
      setType('');
      setStock('');
      setFile();
    }
  }
};


  return (
    <>
   
    <section className="h-100 gradient-form " >
    {alertmsg &&
      <div className="alert alert-success">{alertmsg}</div>
    }
    <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
     
                    <div className="text-center">
                        <img src='/website/logo.jpg'  style={{Width:"160px"}} alt="logo"/>
             <h3 className="mt-1 mb-5 pb-1">We are The DressWel Team</h3>
           </div>
<form onSubmit={handleSubmit} className="form my-3 mx-3  "   id ="myform" method="post" encType='multipart/form-data'>
    <div className="mb-3">
    <label htmlhtmlfor="name">name<b className="main">*</b></label>
<input type="text" name="name" onChange={(e) => setName(e.target.value)} required id="name"/>
</div>
<div className="mb-3">
<label htmlhtmlfor="description">Description<b className="main">*</b></label>
<input type="text" name="description" onChange={(e) => setDescription(e.target.value)} required id="description"/>
</div>
<div className="mb-3">
<label htmlhtmlfor="price">price<b className="main">*</b></label><br></br>
<input type="text" name="price" onChange={(e) => setPrice(e.target.value)} required id="price"/>

</div>
<div className="mb-3">
<label htmlhtmlfor="brand">Brand<b className="main">*</b></label>
<input type="text" name="brand" onChange={(e) => setBrand(e.target.value)} required id="brand"/>
</div>
<div className="mb-3">
<label htmlhtmlfor="gender">gender<b className="main">*</b></label>
{/* <input type="radio"   name="gender" value="male" id="for"/>male 
<input type="radio" name="gender" value ="female" id = 'for'/>female 
<input type="radio" name="gender" value ="kids" id = 'for'/>kids 
<input type="radio" name="gender" value ="unisex" id = 'for'/>unisex  */}
<select name="gender" className="mx-4 my-2"onChange={(e)=>{setGender(e.target.value)}}>
<option value="">Please select one…</option>
  <option value="female">female</option>
  <option value="male">Male</option>
  <option value="unisex">unisex</option>
  <option value="kids">kids</option>
 

</select>
</div>
<div className="mb-3">
<label htmlhtmlfor="type">type<b className="main">*</b></label> <br/>
<input type="text" name="type" onChange={(e)=>{setType(e.target.value)}} id="type"/>
</div>
<div className="mb-3">
<label htmlhtmlfor="type">stock<b className="main">*</b></label> 
<input type="number" onChange={(e)=>{setStock(e.target.value)}} name="stock" id="stock"/>
</div>
<div className="mb-3 ">
<label htmlhtmlfor='file' className="custom-file ">upload <b className="main">*</b></label>
<input type="file" className="custom-file-input form-control" onChange={(e) => { setFile(Array.from(e.target.files)) }}  name="file" id="file" multiple/>
</div>
<div className="mb-3 " id="addonclass">

</div>



<div className="mb-3">
<input type="submit" className="btn btn btn-danger mx-4" value="submit"  />
<input type="reset" className="btn btn btn-warning" value="reset"/>
</div>
 </form>
</div>
</div>
</div>
</div>
</div>
</div>
</div>


</section>
</>
);
}

export default Admin;
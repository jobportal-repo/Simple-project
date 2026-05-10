import "./App.css"
import { useState,useEffect } from "react";

function App() {

  const [formData,setFormData]=useState({name:"",email:"",password:""})
  const [users,setUsers]=useState([]);

  //fetch all users
  const getUsers=async()=>{
    const res=await fetch("http://localhost:5000/users");
    const data=await res.json();
    setUsers(data);
  };
  useEffect(()=>{
    getUsers();
  },[]);
  
  //handle form input
const handleChange=(e)=>{
  setFormData({...formData,[e.target.name]:e.target.value});

}
const handleSubmit=async(e)=>{
  e.preventDefault();
  await fetch("http://localhost:5000/add-user",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(formData),
  });
  setFormData({name:"",email:"",password:""});
  getUsers();
}

  return (
    <>
    <h1>Personal Details</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Enter the name" value={formData.name} onChange={handleChange}></input>
        <input type="email" name="email" placeholder="Enter the email" value={formData.email} onChange={handleChange}></input>
        <input type="password" name="password" placeholder="Enter the password" value={formData.password} onChange={handleChange}></input>
        <button type="submit">Submit</button>
        </form>  

        <h2>User List</h2>
    <div className="user-list">
        {users.map((user, i) => (
        <div className="user-card" key={i}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Password:</strong> {user.password}</p>
    </div>
  ))}
</div>  
    </>
  );
  
}

export default App;
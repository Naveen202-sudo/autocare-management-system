import { useState } from "react";
import {useNavigate, Link} from  "react-router-dom"
import "../App.css"

function Register(){

    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState({
        name:"",
        phone:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const [errors, setErrors] = useState({});

    const handleChange=(e)=>{
        setRegisterData({...registerData,[e.target.name]:e.target.value})
    }
    const handleRegister=(e)=>{
       e.preventDefault();

         let err = {};

         let isCheck= {
      nameCheck : false,
      emailCheck : false,
      phoneCheck : false,
      passwordCheck : false,
      confirmPasswordCheck : false
    }

  if (registerData.name === "") {
    err.name = "Name cannot be empty";
    isCheck.nameCheck = false
  } else if (registerData.name.length < 3) {
    err.name = "Name must be at least 3 characters";
    isCheck.nameCheck = false
  }else{
    err.name = ""
    isCheck.nameCheck = true
  }

  const emailPattern =
    /^[a-zA-Z0-9.+%-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

  if (registerData.email === "") {
    err.email = "Email cannot be empty";
    isCheck.emailCheck = false
  } else if (!emailPattern.test(registerData.email)) {
    err.email = "Invalid Email";
    isCheck.emailCheck = false
  }else{
    err.email = ""
    isCheck.emailCheck = true
  }

  const phonePattern = /^[6-9]\d{9}$/;

  if (registerData.phone === "") {
    err.phone = "Phone cannot be empty";
    isCheck.phoneCheck = false
  } else if (!phonePattern.test(registerData.phone)) {
    err.phone = "Invalid Phone Number";
    isCheck.phoneCheck = false
  }else{
    err.phone = ""
    isCheck.phoneCheck = true
  }

  if (registerData.password === "") {
    err.password = "Password cannot be empty";
    isCheck.passwordCheck = false
  } else if (registerData.password.length < 6) {
    err.password = "Password must be 6 characters";
    isCheck.passwordCheck = false
  }else{
    err.password = ""
    isCheck.passwordCheck = true
  }

  if (registerData.confirmPassword === "") {
    err.confirmPassword = "Confirm Password cannot be empty";
    isCheck.confirmPasswordCheck = false
  } else if (
    registerData.confirmPassword !== registerData.password
    
  ) {
    err.confirmPassword = "Passwords do not match";
    isCheck.confirmPasswordCheck = false
  }else if(registerData.confirmPassword.length<6){
    err.confirmPassword = "Confirm password must be 6 charcters"
    isCheck.confirmPasswordCheck = false
  }else{
    err.confirmPassword = ""
    isCheck.confirmPasswordCheck = true

  }
  console.log(err);
  setErrors(err);

  if (
  isCheck.nameCheck &&
  isCheck.emailCheck &&
  isCheck.phoneCheck &&
  isCheck.passwordCheck &&
  isCheck.confirmPasswordCheck
) {

    const users =
      JSON.parse(localStorage.getItem("userdetails")) || [];

    users.push(registerData);

    localStorage.setItem(
      "userdetails",
      JSON.stringify(users)
    );

    alert("Registration Successful");

    navigate("/login");
  }
    }




    return(
        <>
        <div className="register-container">
        <form className="register-form" onSubmit={handleRegister}>
            <h2>Create Your Auto Care Account</h2>

            <input type="text" name="name" placeholder="Enter name" onChange={handleChange} />
            <p>{errors.name}</p>

            <input type="text" name="phone" placeholder="Enter phonenumber" onChange={handleChange} />
             <p>{errors.phone}</p>

            <input type="email" name="email" placeholder="Enter Email" onChange={handleChange} />
            <p>{errors.email}</p>


            <input type="password" name="password" placeholder="Enter password" onChange={handleChange} />
             <p>{errors.password}</p>
             
            <input type="password" name="confirmPassword" placeholder="Enter ConfirmPassword" onChange={handleChange} />
            <p>{errors.confirmPassword}</p>

            <button type="submit">Register</button>

            <br /><br />
            <Link to="/login">
            Already have an account? Login</Link>

            </form>
        </div>
        </>
    )

  
}
  export default Register
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";


function Login() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e) => {

    e.preventDefault();

    const users =
      JSON.parse(localStorage.getItem("userdetails")) || [];

    const user = users.find(
      (u) =>
        u.email === loginData.email &&
        u.password === loginData.password
    );

    if (user) {

      localStorage.setItem(
        "loggedUser",
        JSON.stringify(user)
      );

      alert("Login Successful");

      navigate("/dashboard");

    } else {

      setError("Invalid Email or Password");

    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>

        <h2>Login Page</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <p>{error}</p>

        <button type="submit">
          Login
        </button>

        <br /><br />

        <Link to="/">
          Create New Account
        </Link>

      </form>
    </div>
  );
}

export default Login;
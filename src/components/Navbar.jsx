 import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <h2
        style={{
          color: "white",
          fontSize: "28px",
          fontWeight: "bold",
          margin: "0"
        }}
      >
        AutoCare Management System
      </h2>

      <div className="nav-links">

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/customer">Customer</Link>

        <Link to="/vehicles">Vehicles</Link>

        <Link to="/services">Services</Link>

        <Link to="/servicerecord">Service Record</Link>

        <Link to="/billing">Billing</Link>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;
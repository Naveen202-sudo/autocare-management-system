import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {

  const navigate = useNavigate();

  const loggedUser = JSON.parse(
    localStorage.getItem("loggedUser")
  );

  const [dashboardData, setDashboardData] = useState({
    customers: 0,
    vehicles: 0,
    services: 0,
    records: 0,
    revenue: 0
  });

  useEffect(() => {

    const customers =
      JSON.parse(localStorage.getItem("customers")) || [];

    const vehicles =
      JSON.parse(localStorage.getItem("vehicles")) || [];

    const services =
      JSON.parse(localStorage.getItem("services")) || [];

    const records =
      JSON.parse(localStorage.getItem("serviceRecords")) || [];

    const bills =
      JSON.parse(localStorage.getItem("bills")) || [];

    const totalRevenue = bills.reduce(
      (total, bill) =>
        total + Number(bill.amount),
      0
    );

    setDashboardData({
      customers: customers.length,
      vehicles: vehicles.length,
      services: services.length,
      records: records.length,
      revenue: totalRevenue
    });

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("loggedUser");

    navigate("/login");

  };

  return (

    <div className="dashboard-layout">

      <div className="sidebar">

        <h2>ACMS</h2>

        <ul>

          <li>Dashboard</li>

          <li>
            <Link to="/customer">
              Customers
            </Link>
          </li>

          <li>
            <Link to="/vehicles">
              Vehicles
            </Link>
          </li>

          <li>
            <Link to="/services">
              Services
            </Link>
          </li>

          <li>
            <Link to="/servicerecord">
              Service Records
            </Link>
          </li>

          <li>
            <Link to="/billing">
              Billing
            </Link>
          </li>

        </ul>

      </div>

      <div className="main-content">

        <div className="navbar">

          <h2>
            AutoCare Management System
          </h2>

          <button onClick={handleLogout}>
            Logout
          </button>

        </div>

        <div className="welcome-section">

          <h1>
            Welcome, {loggedUser.name}
          </h1>

          <p>
            Manage Customers, Vehicles,
            Services and Billing from one place.
          </p>

        </div>

        <div className="dashboard-cards">

          <div className="card">

            <h3>👥 Customers</h3>

            <p>
              {dashboardData.customers}
            </p>

          </div>

          <div className="card">

            <h3>🚗 Vehicles</h3>

            <p>
              {dashboardData.vehicles}
            </p>

          </div>

          <div className="card">

            <h3>🔧 Services</h3>

            <p>
              {dashboardData.services}
            </p>

          </div>

          <div className="card">

            <h3>📋 Records</h3>

            <p>
              {dashboardData.records}
            </p>

          </div>

          <div className="card revenue-card">

            <h3>💰 Revenue</h3>

            <p>
              ₹{dashboardData.revenue}
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;
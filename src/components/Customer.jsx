import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"

function Customer() {

  const navigate = useNavigate();

  const [customerData, setCustomerData] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {

    const savedCustomers =
      JSON.parse(localStorage.getItem("customers")) || [];

    setCustomerList(savedCustomers);

  }, []);

  const handleChange = (e) => {

    setCustomerData({
      ...customerData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const updatedCustomers = [
      ...customerList,
      customerData
    ];

    setCustomerList(updatedCustomers);

    localStorage.setItem(
      "customers",
      JSON.stringify(updatedCustomers)
    );

    setCustomerData({
      name: "",
      phone: "",
      email: ""
    });

    alert("Customer Added Successfully");

    navigate("/vehicles");

  };

  const deleteCustomer = (index) => {

    const updatedCustomers =
      customerList.filter((_, i) => i !== index);

    setCustomerList(updatedCustomers);

    localStorage.setItem(
      "customers",
      JSON.stringify(updatedCustomers)
    );

  };

  return (
    <>

       <Navbar />

      <div className="customer-container">
      
      </div>  
      <div className="customer-container">

        <h2>Add Customer</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={customerData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Enter Phone Number"
            value={customerData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={customerData.email}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Add Customer
          </button>

        </form>

        <h2 className="customer-title">
          Customer List
        </h2>

        <table>

          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {customerList.length === 0 ? (

              <tr>
                <td colSpan="5">
                  No Customers Found
                </td>
              </tr>

            ) : (

              customerList.map((customer, index) => (

                <tr key={index}>

                      <td>{index + 1}</td>
                      <td>{customer.name}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.email}</td>

                  <td>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => deleteCustomer(index)}
                    >
                      Delete
                    </button>
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>
    </>
  );
}

export default Customer;
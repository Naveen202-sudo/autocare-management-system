import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Vehicles() {

  const navigate = useNavigate();

  const [vehicleData, setVehicleData] = useState({
    vehicleNumber: "",
    model: "",
    brand: "",
    owner: ""
  });

  const [vehicleList, setVehicleList] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {

    const savedVehicles =
      JSON.parse(localStorage.getItem("vehicles")) || [];

    setVehicleList(savedVehicles);

    const savedCustomers =
      JSON.parse(localStorage.getItem("customers")) || [];

    setCustomers(savedCustomers);

  }, []);

  const handleChange = (e) => {

    setVehicleData({
      ...vehicleData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = (e) => {

      e.preventDefault();


    const newVehicle = {
      ...vehicleData,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    const updatedVehicles = [
      ...vehicleList,
      newVehicle
    ];

    setVehicleList(updatedVehicles);

    localStorage.setItem(
      "vehicles",
      JSON.stringify(updatedVehicles)
    );

    setVehicleData({
      vehicleNumber: "",
      model: "",
      brand: "",
      owner: ""
    });

    alert("Vehicle Added Successfully");

    navigate("/services");

  };

  const deleteVehicle = (index) => {

    const updatedVehicles =
      vehicleList.filter((_, i) => i !== index);

    setVehicleList(updatedVehicles);

    localStorage.setItem(
      "vehicles",
      JSON.stringify(updatedVehicles)
    );

  };

  return (

          <>
           <Navbar />

      <div className="vehicle-container">
      </div>

        

 

      
    <div className="vehicle-content">

      <div className="vehicle-box">

        <h2>🚗 Vehicle Management</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="vehicleNumber"
            placeholder="Enter Vehicle Number"
            value={vehicleData.vehicleNumber}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="model"
            placeholder="Enter Vehicle Model"
            value={vehicleData.model}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="brand"
            placeholder="Enter Vehicle Brand"
            value={vehicleData.brand}
            onChange={handleChange}
            required
          />

          <select
            name="owner"
            value={vehicleData.owner}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Customer
            </option>

            {customers.map((customer, index) => (
              <option key={index} value={customer.name} >
                {customer.name}
              </option>
            ))}
          </select>

          <button type="submit">
            Add Vehicle
          </button>

        </form>

        <h2 style={{ marginTop: "30px" }}>
          🚙 Vehicle List
        </h2>

        <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>S.No</th>
              <th>Vehicle No</th>
              <th>Model</th>
              <th>Brand</th>
              <th>Owner</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {vehicleList.length === 0 ? (

              <tr>
                <td colSpan="6">
                  No Vehicles Found
                </td>
              </tr>

            ) : (

              vehicleList.map((vehicle, index) => (

                <tr key={index}>

                  <td>{index + 1}</td>
                  <td>{vehicle.vehicleNumber}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.brand}</td>
                  <td>{vehicle.owner}</td>
                  <td>{vehicle.date}</td>
                  <td>{vehicle.time}</td>

                  <td>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => deleteVehicle(index)}
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

      </div>

    </div>
    </>
  );
}

export default Vehicles;
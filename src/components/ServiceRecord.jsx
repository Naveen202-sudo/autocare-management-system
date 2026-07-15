import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"

function ServiceRecords() {

  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);

  const [recordData, setRecordData] = useState({
    customer: "",
    vehicle: "",
    service: "",
    serviceDate: "",
    status: "Pending"
  });

  const [recordList, setRecordList] = useState([]);

  useEffect(() => {

    const savedCustomers =
      JSON.parse(localStorage.getItem("customers")) || [];

    const savedVehicles =
      JSON.parse(localStorage.getItem("vehicles")) || [];

    const savedServices =
      JSON.parse(localStorage.getItem("services")) || [];

    const savedRecords =
      JSON.parse(localStorage.getItem("serviceRecords")) || [];

    setCustomers(savedCustomers);
    setVehicles(savedVehicles);
    setServices(savedServices);
    setRecordList(savedRecords);

  }, []);

  const handleChange = (e) => {

    setRecordData({
      ...recordData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const updatedRecords = [
      ...recordList,
      recordData
    ];

    setRecordList(updatedRecords);

    localStorage.setItem(
      "serviceRecords",
      JSON.stringify(updatedRecords)
    );

    alert("Service Record Added Successfully");

    if (recordData.status === "Completed") {
      navigate("/billing");
    }

    setRecordData({
      customer: "",
      vehicle: "",
      service: "",
      serviceDate: "",
      status: "Pending"
    });

  };

  const deleteRecord = (index) => {

    const updatedRecords =
      recordList.filter((_, i) => i !== index);

    setRecordList(updatedRecords);

    localStorage.setItem(
      "serviceRecords",
      JSON.stringify(updatedRecords)
    );

  };

  return (

    <>

    <Navbar />

      <div>
        
      </div>
    <div className="service-record-container">

      <div className="service-record-box">

        <h2>📋 Service Records</h2>

        <form onSubmit={handleSubmit}>

          <select
            name="customer"
            value={recordData.customer}
            onChange={handleChange}
            required
          >
            <option value="">Select Customer</option>

            {customers.map((customer, index) => (
              <option
                key={index}
                value={customer.name}
              >
                {customer.name}
              </option>
            ))}
          </select>

          <select
            name="vehicle"
            value={recordData.vehicle}
            onChange={handleChange}
            required
          >
            <option value="">Select Vehicle</option>

            {vehicles.map((vehicle, index) => (
              <option
                key={index}
                value={vehicle.vehicleNumber}
              >
                {vehicle.vehicleNumber}
              </option>
            ))}
          </select>

          <select
            name="service"
            value={recordData.service}
            onChange={handleChange}
            required
          >
            <option value="">Select Service</option>

            {services.map((service, index) => (
              <option
                key={index}
                value={service.serviceName}
              >
                {service.serviceName}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="serviceDate"
            value={recordData.serviceDate}
            onChange={handleChange}
            required
          />

          <select
            name="status"
            value={recordData.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <button type="submit">
            Add Record
          </button>

        </form>

        <h2 style={{ marginTop: "30px" }}>
          📄 Service Record List
        </h2>

        <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>S.No</th>
              <th>Customer</th>
              <th>Vehicle</th>
              <th>Service</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {recordList.length === 0 ? (

              <tr>
                <td colSpan="7">
                  No Records Found
                </td>
              </tr>

            ) : (

              recordList.map((record, index) => (

                <tr key={index}>

                  <td>{index + 1}</td>
                  <td>{record.customer}</td>
                  <td>{record.vehicle}</td>
                  <td>{record.service}</td>
                  <td>{record.serviceDate}</td>
                  <td>{record.status}</td>

                  <td>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => deleteRecord(index)}
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

export default ServiceRecords;

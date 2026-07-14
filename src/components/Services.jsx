import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"

function Services() {

  const navigate = useNavigate();

  const [serviceData, setServiceData] = useState({
    serviceName: "",
    serviceCost: "",
    description: ""
  });

  const [serviceList, setServiceList] = useState([]);

  useEffect(() => {

    const savedServices =
      JSON.parse(localStorage.getItem("services")) || [];

    setServiceList(savedServices);

  }, []);

  const handleChange = (e) => {

    setServiceData({
      ...serviceData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const updatedServices = [
      ...serviceList,
      serviceData
    ];

    setServiceList(updatedServices);

    localStorage.setItem(
      "services",
      JSON.stringify(updatedServices)
    );

    setServiceData({
      serviceName: "",
      serviceCost: "",
      description: ""
    });

    alert("Service Added Successfully");

    navigate("/servicerecord");

  };

  const deleteService = (index) => {

    const updatedServices =
      serviceList.filter((_, i) => i !== index);

    setServiceList(updatedServices);

    localStorage.setItem(
      "services",
      JSON.stringify(updatedServices)
    );

  };

  return (
    <>

      <Navbar />

      <div className="service-container">
        
      </div> 

    <div className="service-content">

      <div className="service-box">

        <h2>🔧 Service Management</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="serviceName"
            placeholder="Enter Service Name"
            value={serviceData.serviceName}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="serviceCost"
            placeholder="Enter Service Cost"
            value={serviceData.serviceCost}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Enter Service Description"
            value={serviceData.description}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Add Service
          </button>

        </form>

        <h2 style={{ marginTop: "30px" }}>
          📋 Service List
        </h2>

        <table>

          <thead>
            <tr>
              <th>S.No</th>
              <th>Service Name</th>
              <th>Cost</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {serviceList.length === 0 ? (

              <tr>
                <td colSpan="5">
                  No Services Found
                </td>
              </tr>

            ) : (

              serviceList.map((service, index) => (

                <tr key={index}>

                  <td>{index + 1}</td>
                  <td>{service.serviceName}</td>
                  <td>₹{service.serviceCost}</td>
                  <td>{service.description}</td>

                  <td>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => deleteService(index)}
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
    </>
  );
}

export default Services;
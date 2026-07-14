import { useState, useEffect } from "react";
import Navbar from "./Navbar"

function Billing() {

  const [serviceRecords, setServiceRecords] = useState([]);
  const [services, setServices] = useState([]);

  const [billData, setBillData] = useState({
    customer: "",
    vehicle: "",
    service: "",
    amount: ""
  });

  const [billList, setBillList] = useState([]);

  useEffect(() => {

    const savedRecords =
      JSON.parse(localStorage.getItem("serviceRecords")) || [];

    const savedServices =
      JSON.parse(localStorage.getItem("services")) || [];

    const savedBills =
      JSON.parse(localStorage.getItem("bills")) || [];

    setServiceRecords(savedRecords);
    setServices(savedServices);
    setBillList(savedBills);

  }, []);

  const handleRecordSelect = (e) => {

    const selectedIndex = e.target.value;

    const selectedRecord =
      serviceRecords[selectedIndex];

    if (!selectedRecord) return;

    const selectedService =
      services.find(
        (service) =>
          service.serviceName === selectedRecord.service
      );

    setBillData({
      customer: selectedRecord.customer,
      vehicle: selectedRecord.vehicle,
      service: selectedRecord.service,
      amount: selectedService
        ? selectedService.serviceCost
        : ""
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const newBill = {
      ...billData,
      billDate:
        new Date().toLocaleDateString()
    };

    const updatedBills = [
      ...billList,
      newBill
    ];

    setBillList(updatedBills);

    localStorage.setItem(
      "bills",
      JSON.stringify(updatedBills)
    );

    setBillData({
      customer: "",
      vehicle: "",
      service: "",
      amount: ""
    });

    alert("Bill Generated Successfully");

  };

  const deleteBill = (index) => {

    const updatedBills =
      billList.filter(
        (_, i) => i !== index
      );

    setBillList(updatedBills);

    localStorage.setItem(
      "bills",
      JSON.stringify(updatedBills)
    );

  };

  return (
    <>
      <Navbar />

      <div>
        
      </div>

    <div className="billing-container">

      <div className="billing-box">

        <h2>💰 Billing Management</h2>

        <form onSubmit={handleSubmit}>

          <select
            onChange={handleRecordSelect}
            required
          >

            <option value="">
              Select Service Record
            </option>

            {serviceRecords.map(
              (record, index) => (

                <option
                  key={index}
                  value={index}
                >

                  {record.customer}
                  {" - "}
                  {record.service}

                </option>

              )
            )}

          </select>

          <input
            type="text"
            value={billData.customer}
            placeholder="Customer"
            readOnly
          />

          <input
            type="text"
            value={billData.vehicle}
            placeholder="Vehicle"
            readOnly
          />

          <input
            type="text"
            value={billData.service}
            placeholder="Service"
            readOnly
          />

          <input
            type="text"
            value={billData.amount}
            placeholder="Amount"
            readOnly
          />

          <button type="submit">
            Generate Bill
          </button>

          <button
            type="button"
            onClick={() => window.print()}
          >
            Print Bill
          </button>

        </form>

        <h3 style={{ marginTop: "20px" }}>
          Total Bills : {billList.length}
        </h3>

        <h2
          style={{
            marginTop: "30px"
          }}
        >
          📄 Billing List
        </h2>

        <table>

          <thead>

            <tr>
              <th>S.No</th>
              <th>Customer</th>
              <th>Vehicle</th>
              <th>Service</th>
              <th>Amount</th>
              <th>Bill Date</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {billList.length === 0 ? (

              <tr>

                <td colSpan="7">
                  No Bills Found
                </td>

              </tr>

            ) : (

              billList.map(
                (bill, index) => (

                  <tr key={index}>

                    <td>
                      {index + 1}
                    </td>

                    <td>
                      {bill.customer}
                    </td>

                    <td>
                      {bill.vehicle}
                    </td>

                    <td>
                      {bill.service}
                    </td>

                    <td>
                      ₹{bill.amount}
                    </td>

                    <td>
                      {bill.billDate}
                    </td>

                    <td>

                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() =>
                          deleteBill(index)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

    </div>
    </>

  );

}

export default Billing;
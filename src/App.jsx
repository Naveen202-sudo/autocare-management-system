import {BrowserRouter, Routes, Route} from "react-router-dom";
import Customer from "./components/Customer"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import Register from "./components/Register"
import Vehicles from "./components/Vehicles"
import Services from "./components/Services"
import ServiceRecord from "./components/ServiceRecord"
import Billing from "./components/Billing"

function App() {
  
  return (  

    <>
    
      <BrowserRouter>
    <Routes>
       <Route path="/" element={<Register/>}/>
       <Route path="/login" element={<Login/>}/>
      <Route path="/customer" element={<Customer/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/vehicles" element={<Vehicles/>}/>
      <Route path="/services" element={<Services/>}/>
      <Route path="/servicerecord" element={<ServiceRecord/>}/>
      <Route path="/billing" element={<Billing/>}/>
    </Routes>
     </BrowserRouter>  
     
    </>
  )
}

export default App

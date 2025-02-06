import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import User from './pages/user'
import Home from './pages'
import DeliverymanForm from './pages/Deliveryman'
import VendorForm from './pages/Vendor'
// Example Components for Routing


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/partners" element={<User />} />
        <Route path="/vendor" element={<VendorForm />} />
        <Route path="/deliveryman" element={<DeliverymanForm />} />
      </Routes>
    </Router>
  )
}

export default App

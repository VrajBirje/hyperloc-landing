import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import User from './pages/user'
import Home from './pages'
// Example Components for Routing


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  )
}

export default App

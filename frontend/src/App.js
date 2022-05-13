import react from "react"
import { 
  BrowserRouter as Router, 
  Routes, 
  Link, 
  Route 
} from 'react-router-dom';
import NavBar from "./components/NavBar"

import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <NavBar />
        </Routes>
      </Router>
    </div>
  )
}

export default App;

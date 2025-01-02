import './App.css'; 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home'; // Import your Home component

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
            <ul>
              <li>
                <Link to="/users">Users</Link> {/* Link to Users page */}
              </li>
              
            </ul>
        </nav>
        <Routes>
          {/* Route for Home */}
          <Route path="/users" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
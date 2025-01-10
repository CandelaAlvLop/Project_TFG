import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App;

/*
function App() {
  return (
    <Router>
      <div className="App">
        <nav>
            <ul>
              <li>
                <Link to="/users">Users</Link> 
              </li>
            </ul>
        </nav>
        <Routes>
          <Route path="/users" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;*/

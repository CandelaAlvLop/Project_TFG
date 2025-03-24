import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PersonalData from './pages/PersonalData';
import Notifications from './pages/Notifications';
import MyConsume from './pages/MyConsume';
import DataDonation from './pages/DataDonation';
import Campaigns from './pages/Campaigns';
import Instructions from './pages/Instructions';
import Faq from './pages/Faq';
import AddProperty from './pages/AddProperty';
import EditProperty from './pages/EditProperty';
import ModifyConsent from './pages/ModifyConsent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/personaldata" element={<PersonalData />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/myconsume" element={<MyConsume />} />
        <Route path="/datadonation" element={<DataDonation />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/faq" element={<Faq/>} />
        <Route path="/addproperty" element={<AddProperty/>} />
        <Route path="/editproperty" element={<EditProperty/>} />
        <Route path="/modifyconsent" element={<ModifyConsent/>} />
      </Routes>
    </Router>
  )
}

export default App;

import React, { useEffect, useState } from 'react';
import Navbar from './NavbarIn';
import Navbar2 from './Navbar2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditConsent() {
  const userId = localStorage.getItem('user_id');
  const propertyId = localStorage.getItem('property_id');
  const dataType = localStorage.getItem('data_type');

  const [consents, setConsents] = useState([]);
  const [availableOptions] = useState(['Research', 'Government', 'Private']);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/UserManager/consents/${userId}/${propertyId}/${dataType}`)
      .then(res => setConsents(res.data))
      .catch(() => setConsents([]));
  }, []);

  const toggleConsent = (type) => {
    if (consents.includes(type)) {
      setConsents(consents.filter(c => c !== type));
    } else {
      setConsents([...consents, type]);
    }
  };

  const handleSave = () => {
    axios.post(`http://localhost:3001/UserManager/consents/${userId}/${propertyId}/${dataType}`, { consents })
      .then(() => navigate('/datadonation'));
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:3001/UserManager/donation/${userId}/${propertyId}/${dataType}`)
      .then(() => navigate('/datadonation'));
  };

  return (
    <div>
      <Navbar />
      <Navbar2 />
      <div className="consent-modify">
        <h2>Modify Consent for {dataType}</h2>

        <div className="checkboxes">
          {availableOptions.map(type => (
            <label key={type}>
              <input
                type="checkbox"
                checked={consents.includes(type)}
                onChange={() => toggleConsent(type)}
              />
              {type}
            </label>
          ))}
        </div>

        <button onClick={handleSave}>Save</button>
        <button onClick={() => setConfirmDelete(true)}>Delete All Data</button>

        {confirmDelete && (
          <div className="confirmation">
            <p>Are you sure you want to delete all data?</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => setConfirmDelete(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditConsent;

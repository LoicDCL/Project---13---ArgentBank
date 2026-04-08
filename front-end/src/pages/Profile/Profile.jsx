import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/sign-in');
      return;
    }

    fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.body);
        setFirstName(data.body.firstName);
        setLastName(data.body.lastName);
        localStorage.setItem('firstName', data.body.firstName);
      })
      .catch(() => {
        navigate('/sign-in');
      });
  }, [navigate]);


  const handleSave = () => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.body);
        localStorage.setItem('firstName', data.body.firstName);
        setIsEditing(false);
      })
      .catch(() => {
        console.error('Erreur lors de la mise à jour');
      });
  };

  return (
    <>
      <div className="header">
        {isEditing ? (
          <>
            <h1>Welcome back</h1>
            <div className="edit-form">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
            </div>
            <div className="edit-buttons">
              <button className="edit-button" onClick={handleSave}>Save</button>
              <button className="edit-button" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <h1>Welcome back<br />{user ? `${user.firstName} ${user.lastName}` : '...'}</h1>
            <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>
          </>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </>
  );
}

export default Profile;
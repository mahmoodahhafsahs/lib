import React from 'react';
import { useNavigate } from 'react-router-dom';
import helloImage from './hello.jpg'; // Import the background image
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

function Welcome() {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate('/signup');
  };

  const handleAdminClick = () => {
    navigate('/admin-login');
  };

  return (
    <div
      className="bg-dark" // Dark background color
      style={{
        backgroundImage: `url(${helloImage})`, // Set the background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className="bg-transparent p-5 rounded text-center" // Fully transparent background color for content
        style={{
          maxWidth: '400px', // Set a maximum width for better alignment
        }}
      >
        <button
          className='btn btn-success w-100 rounded-0 mb-2'
          style={{ backgroundColor: '#FFA500', color: '#FFFFFF' }} // Orange background color
          onClick={handleUserClick}
        >
          User
        </button>
        <button
          className='btn btn-danger w-100 rounded-0'
          style={{ backgroundColor: '#FFA500', color: '#FFFFFF' }} // Orange background color
          onClick={handleAdminClick}
        >
          Admin
        </button>
      </div>
    </div>
  );
}

export default Welcome;

import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Routes, Route } from 'react-router-dom';

// Component to display when authenticated (Your "home" content)
const Profile = () => {
  const { logout } = useAuth0();
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Developers</h2>
      <ul>
        <li style={{ listStyle: 'none', marginBottom: '10px' }}>Taonga sikalumbi 2300104</li>
        <li style={{ listStyle: 'none', marginBottom: '10px' }}>Sampa Nathan 2300157</li>
        <li style={{ listStyle: 'none', marginBottom: '10px' }}>Abraham Kaluba</li>
        <li style={{ listStyle: 'none', marginBottom: '10px' }}>Mumba</li>
        <li style={{ listStyle: 'none', marginBottom: '10px' }}>Katwamba Musonda</li>
      </ul>
      <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out
      </button>
    </div>
  );
};

// Component to display when not authenticated (The login page)
const Landing = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Please Log In</h1>
      <button onClick={() => loginWithRedirect()}>
        Log In
      </button>
      <div style={{ marginTop: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <h3>For Instructor: Dummy Credentials</h3>
        <p>Email: <strong>testuser@example.com</strong></p>
        <p>Password: <strong>Password123</strong></p>
        <p>You can also sign up with any email/password or social account via the login form.</p>
      </div>
    </div>
  );
};

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/home" element={isAuthenticated ? <Profile /> : <Landing />} />
          <Route path="*" element={isAuthenticated ? <Profile /> : <Landing />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;

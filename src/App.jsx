import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Routes, Route } from 'react-router-dom';

// Component to display when authenticated
const Profile = () => {
  const { user, logout } = useAuth0();
  return (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out
      </button>
    </div>
  );
};

// Component to display when not authenticated (the login page)
const Landing = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button onClick={() => loginWithRedirect()}>
      Log In
    </button>
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

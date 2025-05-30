import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Routes, Route, Link } from 'react-router-dom';

// Component to display when authenticated (Your "home" content)
const Profile = () => {
  const { user, logout } = useAuth0();
  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <img src={user.picture} alt={user.name} />
      <p>{user.email}</p>
      {/* Add any other content you want for the home page here */}
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
    <div>
      <h1>Please Log In</h1>
      <button onClick={() => loginWithRedirect()}>
        Log In
      </button>
    </div>
  );
};

function App() {
  const { isAuthenticated, isLoading } = useAuth0(); // Also get isLoading

  // While the SDK is loading or processing the redirect, you might want to show a loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          {/* Route for the landing page - shows login button if not authenticated */}
          <Route path="/" element={isAuthenticated ? <Link to="/home">Go to Home</Link> : <Landing />} />

          {/* Route for the home page - shows profile if authenticated */}
          <Route path="/home" element={isAuthenticated ? <Profile /> : <Landing />} />

          {/* Optional: Catch-all route for any other path */}
          <Route path="*" element={isAuthenticated ? <Profile /> : <Landing />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;

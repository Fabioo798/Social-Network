import { useState } from "react";
import { LoginForm } from "../../users/component/login/login";
import Register from "../../users/component/register/register";
import Profile from "../../users/component/users/users";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };


  return (
    <div className="App">
      {!loggedIn && (
        <div>
          <Register handleLogin={handleLogin} />
          <LoginForm handleLogin={handleLogin} />
        </div>
      )}
      {loggedIn && (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <Profile />
        </div>
      )}
    </div>
  );
}

export default App;

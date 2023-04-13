import { redirect, Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import "./App.scss";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

function App() {
  const user = true;
  return (
    <Routes>
      <Route exact path="/" element={user ? <Home /> : <Register />} />
      {user && (
        <>
          <Route path="/movies" element={<Home type="movie" />} />
          <Route path="/series" element={<Home type="series" />} />
          <Route path="/watch" element={<Watch />} />
        </>
      )}

      <Route path="/login" element={user ? <Home /> : <Login />} />
      <Route path="/register" element={user ? <Home /> : <Register />} />
    </Routes>
  );
}

export default App;

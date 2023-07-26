import { redirect, Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import "./App.scss";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";
import { Navigate } from "react-router-dom";

function App() {
  const { user } = useContext(AuthContext);
  
  return (
    <Routes>

      <Route exact path="/" element={user ? <Home /> : <Navigate to='/register' replace={true} />} />
      <Route path='/register' element={ !user ? <Register /> : <Navigate to='/' />}/>
      {user && (
        <>
          <Route path="/movies" element={<Home type="movie" />} />
          <Route path="/series" element={<Home type="series" />} />
          <Route path="/watch" element={<Watch />} />
        </>
      )}

      <Route path="/login" element={user ? <Home /> : <Login />} />
      {/* <Route path="/register" element={ <Register />} /> */}
    </Routes>
  );
}

export default App;

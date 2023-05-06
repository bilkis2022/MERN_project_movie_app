import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Movie from "./pages/movie/Movie";
import MovieList from "./pages/movieList/MovieList";

function App() {
  return (
    <div className="App">
      <Topbar />
      <Home />
      <Login />
      <Routes>
        <Route path="/movies" element={<MovieList />}></Route>
        <Route path="/movie/:movieId" element={<Movie />}></Route>
       </Routes>
    </div>
  );
}

export default App;

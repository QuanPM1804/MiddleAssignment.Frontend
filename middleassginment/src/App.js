import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Navbar from "./components/Navbar";
import Books from "./pages/Books";
import CreateEditBook from "./pages/CreateEditBook";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/create" element={<CreateEditBook />} />
        <Route path="/books/:id/edit" element={<CreateEditBook />} />
      </Routes>
    </Router>
  );
};

export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';
import AddFlashcard from './components/AddFlashcard';
import UpdateFlashcard from './components/UpdateFlashcard';
import AdminLogin from './components/AdminLogin';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/dashboard" 
            element={isLoggedIn ? <AdminDashboard onLogout={handleLogout} /> : <AdminLogin onLogin={handleLogin} />} 
          />
          <Route path="/add-flashcard" element={<AddFlashcard />} />
          <Route path="/update-flashcard/:id" element={<UpdateFlashcard />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

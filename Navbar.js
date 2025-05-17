import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-section left">
        <Link to="/" className="nav-link">
          <strong>Recipe Finder 🍽️</strong>
        </Link>
      </div>

      <div className="navbar-section center">
        <Link to="/favorites" className="nav-link">
          <strong>Favorites</strong>
        </Link>
      </div>

      <div className="navbar-section right">
        <Link to="/recipeBot" className="nav-link">
          <strong>RecipeBot 🤖</strong>
        </Link>
        {user && (
          <button
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;



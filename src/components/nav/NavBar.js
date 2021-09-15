import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = (props) => {
  let logout = () => {
    localStorage.removeItem("bt_token");
  };

  return (
    <ul className="navbar">
      <li className="navbar__item">
        <Link to={"/"}>My Recipes</Link>
      </li>
      <li className="navbar__item">
        <Link to={"/"}>Browse Recipes</Link>
      </li>
      <li className="navbar__item">
        <Link to={"/"}>Create a Recipe</Link>
      </li>
      <li className="navbar__item">
        <Link to={"/"}>Restaurants</Link>
      </li>
      <li className="navbar__item">
        <Link to={"/"}>About</Link>
      </li>
      {localStorage.getItem("bt_token") !== null ? (
        <li className="navbar__item">
          <Link
            onClick={() => {
              logout();
            }}
            to={"/"}
          >
            Logout
          </Link>
        </li>
      ) : (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
        </>
      )}{" "}
    </ul>
  );
};

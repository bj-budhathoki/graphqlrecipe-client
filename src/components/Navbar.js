import React from "react";
import { NavLink } from "react-router-dom";
import SignOut from "./Auth/SignOut";
const Navbar = ({ session }) => (
  <nav>
    {session && session.getCurrentUser ? (
      <NavbarAuth session={session} />
    ) : (
      <NavbarUnAuth />
    )}
  </nav>
);
const NavbarAuth = ({ session }) => (
  <>
    <ul>
      <li>
        <NavLink
          to="/"
          exact
          activeStyle={{
            fontWeight: "bold",
            color: "red"
          }}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/search"
          exact
          activeStyle={{
            fontWeight: "bold",
            color: "red"
          }}
        >
          Search
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/recipe/add"
          exact
          activeStyle={{
            fontWeight: "bold",
            color: "red"
          }}
        >
          add Recipe
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/profile"
          exact
          activeStyle={{
            fontWeight: "bold",
            color: "red"
          }}
        >
          profile
        </NavLink>
      </li>
      <li>
        <SignOut />
      </li>
    </ul>
    <h4>welcome,{session.getCurrentUser.username}</h4>
  </>
);
const NavbarUnAuth = () => (
  <ul>
    <li>
      <NavLink
        to="/"
        exact
        activeStyle={{
          fontWeight: "bold",
          color: "red"
        }}
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/search"
        exact
        activeStyle={{
          fontWeight: "bold",
          color: "red"
        }}
      >
        Search
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/signin"
        exact
        activeStyle={{
          fontWeight: "bold",
          color: "red"
        }}
      >
        signin
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/signup"
        exact
        activeStyle={{
          fontWeight: "bold",
          color: "red"
        }}
      >
        signup
      </NavLink>
    </li>
  </ul>
);
export default Navbar;

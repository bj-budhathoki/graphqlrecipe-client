import React from "react";
import { Link } from "react-router-dom";
const Profile = ({ session }) => (
  <div className="App">
    <h1>user info</h1>
    <p>username:{session.getCurrentUser.username}</p>
    <p>email:{session.getCurrentUser.email}</p>
    <p>join date:{session.getCurrentUser.joinDate}</p>
    <ul>
      <h3>{session.getCurrentUser.username}'s favorites</h3>
      {session.getCurrentUser.favorites.map(favorite => (
        <Link key={favorite._id}>
          <li>{favorite.name}</li>
        </Link>
      ))}
      {!session.getCurrentUser.favorites.length && (
        <strong>no favorites add some</strong>
      )}
    </ul>
  </div>
);
export default Profile;

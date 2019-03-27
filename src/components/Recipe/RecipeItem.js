import React from "react";
const RecipeItem = ({ name, category }) => (
  <li>
    <h4>{name}</h4>
    <strong>{category}</strong>
  </li>
);
export default RecipeItem;

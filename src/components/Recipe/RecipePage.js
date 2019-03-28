import React from "react";
import { Query } from "react-apollo";
import { GET_RECIPE } from "../../queries";
const RecipePage = ({ match }) => {
  const { _id } = match.params;
  console.log("match", _id);
  return (
    <Query query={GET_RECIPE} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <div>loading</div>;
        if (error) return <div>error</div>;
        console.log(data);
        return (
          <div>
            <h1>{data.getRecipe.name}</h1>
            <p>category:{data.getRecipe.category}</p>
            <p>description:{data.getRecipe.description}</p>
            <p>instructions:{data.getRecipe.instructions}</p>
            <p>likes:{data.getRecipe.likes}</p>
            <p>user:{data.getRecipe.username}</p>
            <button>like</button>
          </div>
        );
      }}
    </Query>
  );
};
export default RecipePage;

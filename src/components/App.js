import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_ALL_RECIPES } from "../queries";
import RecipeItem from "./Recipe/RecipeItem";
import "./App.css";
class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Home</h1>
        <Query query={GET_ALL_RECIPES}>
          {({ data, loading, error }) => {
            if (loading) return <div>loading...</div>;
            if (error) return <div>errors</div>;
            console.log(data);
            return (
              <ul>
                {data.getAllRecipes &&
                  data.getAllRecipes.map(recipe => (
                    <RecipeItem {...recipe} key={recipe._id} />
                  ))}
              </ul>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_ALL_RECIPES } from "../queries";
import "./App.css";
class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>home</h1>
        <Query query={GET_ALL_RECIPES}>
          {({ data, loading, error }) => {
            if (loading) return <div>loading...</div>;
            if (error) return <div>errors</div>;
            console.log(data);
            return <p>recipes</p>;
          }}
        </Query>
      </div>
    );
  }
}

export default App;

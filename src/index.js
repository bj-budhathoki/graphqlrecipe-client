import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import "./index.css";

import App from "./components/App";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import WithSession from "./components/WithSeassion";
import Navbar from "./components/Navbar";
import Search from "./components/Recipe/Search";
import AddRecipe from "./components/Recipe/AddRecipe";
import Profile from "./components/Profile/Profile";
import RecipePage from "./components/Recipe/RecipePage";
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log("net work error", networkError);
    }
  }
});

const Root = ({ refetch, session }) => (
  <>
    <Navbar session={session} />
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/search" component={Search} />
      <Route path="/signin" render={() => <Signin refetch={refetch} />} />
      <Route path="/signup" render={() => <Signup refetch={refetch} />} />
      <Route
        path="/recipe/add"
        render={() => <AddRecipe session={session} />}
      />
      <Route path="/recipe/:_id" component={RecipePage} />
      <Route path="/profile" component={Profile} />
    </Switch>
  </>
);
const RootWithSession = WithSession(Root);
ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <RootWithSession />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);

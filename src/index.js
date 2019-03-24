import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import "./index.css";

import App from "./components/App";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const Root = () => (
  <Switch>
    <Route exact path="/" component={App} />
    <Route path="/signin" component={Signin} />
    <Route path="/signup" component={Signup} />
  </Switch>
);

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);

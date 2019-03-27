import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import { SIGNIN_USER } from "../../queries";
const initialState = {
  username: "",
  password: ""
};
export class Signin extends Component {
  state = {
    ...initialState
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  clearState = () => {
    this.setState({ ...initialState });
  };
  validateForm = () => {
    const { username, password } = this.state;
    const invalid = !username || !password;
    return invalid;
  };

  handleSubmit = (event, signinUser) => {
    event.preventDefault();
    signinUser().then(({ data }) => {
      localStorage.setItem("token", data.signinUser.token);
      this.props.refetch();
      this.clearState();
      this.props.history.push("/");
    });
  };
  render() {
    const { username, password } = this.state;
    return (
      <div className="App">
        <h2>SignIn </h2>
        <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
          {(signinUser, { data, loading, error }) => {
            return (
              <>
                <form
                  className="form"
                  onSubmit={event => this.handleSubmit(event, signinUser)}
                >
                  <input
                    type="text"
                    name="username"
                    placeholder="User name"
                    onChange={this.handleChange}
                    value={username}
                  />
                  <br />
                  <br />
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={this.handleChange}
                    value={password}
                  />
                  <br />
                  <br />
                  <button
                    type="submit"
                    className="button-primary"
                    disabled={loading || this.validateForm()}
                  >
                    submit
                  </button>
                </form>
                {error && <p>{error.message}</p>}
              </>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(Signin);

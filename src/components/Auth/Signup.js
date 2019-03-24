import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { SIGNUP_USER } from "../../queries";
const initialState = {
  username: "",
  email: "",
  password: ""
};
export class Signup extends Component {
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
    const { username, email, password } = this.state;
    const invalid = !username || !email || !password;
    return invalid;
  };

  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    signupUser().then(data => {
      console.log(data);
      this.clearState();
    });
  };
  render() {
    const { username, email, password } = this.state;
    return (
      <div className="App">
        <h2>SignUp </h2>
        <Mutation
          mutation={SIGNUP_USER}
          variables={{ username, email, password }}
        >
          {(signupUser, { data, loading, error }) => {
            return (
              <>
                <form
                  className="form"
                  onSubmit={event => this.handleSubmit(event, signupUser)}
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
                    type="email"
                    name="email"
                    placeholder="Email address"
                    onChange={this.handleChange}
                    value={email}
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

export default Signup;
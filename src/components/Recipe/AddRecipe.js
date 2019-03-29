import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import { ADD_RECIPE, GET_ALL_RECIPES } from "../../queries";
const initialState = {
  name: "",
  category: "BreakFast",
  description: "",
  instructions: "",
  username: ""
};
class AddRecipe extends Component {
  state = {
    ...initialState
  };
  componentDidMount() {
    this.setState({ username: this.props.session.getCurrentUser.username });
  }
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  clearState = () => {
    this.setState({ ...initialState });
  };
  handleSubmit = (event, addRecipe) => {
    event.preventDefault();
    addRecipe().then(({ data }) => console.log(data));
    this.clearState();

    this.props.history.push("/");
  };
  updateCache = (cache, { data: { addRecipe } }) => {
    const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });
    cache.writeQuery({
      query: GET_ALL_RECIPES,
      data: {
        getAllRecipes: [addRecipe, ...getAllRecipes]
      }
    });
  };
  render() {
    const { name, category, description, instructions, username } = this.state;
    return (
      <Mutation
        mutation={ADD_RECIPE}
        variables={{ name, category, description, instructions, username }}
        update={this.updateCache}
      >
        {(addRecipe, { data, loading, error }) => {
          return (
            <div className="App">
              <h3 className="App">Add Recipe</h3>
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, addRecipe)}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Recipe Name"
                  onChange={this.handleChange}
                  value={name}
                />
                <br />

                <select
                  name="category"
                  onChange={this.handleChange}
                  value={category}
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
                <br />

                <input
                  type="text"
                  name="description"
                  placeholder="Recipe description"
                  onChange={this.handleChange}
                  value={description}
                />
                <br />

                <textarea
                  name="instructions"
                  placeholder="Add insctruction"
                  onChange={this.handleChange}
                  value={instructions}
                />
                <br />
                <button
                  type="submit"
                  className="button-primary"
                  disabled={loading}
                >
                  submit
                </button>
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
export default withRouter(AddRecipe);

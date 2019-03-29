import React from "react";
import { Query } from "react-apollo";
import { SEARCH_RECIPES } from "../../queries";
import { Link } from "react-router-dom";
const Search = () => (
  <div className="App">
    <Query query={SEARCH_RECIPES} variables={{ searchTerm: "" }}>
      {({ data, loading, error }) => {
        if (loading) return <div>loading....</div>;
        if (error) return <div>error</div>;
        console.log(data);
        return (
          <>
            <input placeholder="search" />
            <div>
              <ul>
                {data.searchRecipes &&
                  data.searchRecipes.map(recipe => (
                    <Link to={`/recipe/${recipe._id}`}>
                      {" "}
                      <li key={recipe._id}>
                        {recipe.name}-{recipe.likes}
                      </li>
                    </Link>
                  ))}
              </ul>
            </div>
          </>
        );
      }}
    </Query>
  </div>
);
export default Search;

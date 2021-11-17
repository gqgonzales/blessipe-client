import React, { useState } from "react";

export const RecipeContext = React.createContext();

export const RecipeProvider = (props) => {
  const [recipes, setRecipes] = useState([]);
  // const [matchedRestaurants, setMatchedRestaurants] = useState([]);

  const getRecipes = () => {
    return fetch("https://blessipe-api.herokuapp.com/recipes", {
      headers: {
        Authorization: `Token ${localStorage.getItem("bt_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setRecipes);
  };

  const getRecipeById = (recipeId) => {
    return fetch(`https://blessipe-api.herokuapp.com/recipes/${recipeId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("bt_token")}`,
      },
    }).then((response) => response.json());
    // .then(setRecipe);
  };

  const createRecipe = (recipe) => {
    return fetch("https://blessipe-api.herokuapp.com/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("bt_token")}`,
      },
      body: JSON.stringify(recipe),
    });
    // .then(getRecipes);
  };

  const editRecipe = (recipe) => {
    return fetch(`https://blessipe-api.herokuapp.com/recipes/${recipe.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("bt_token")}`,
      },
      body: JSON.stringify(recipe),
    });
    // .then(getRecipes);
  };

  const deleteRecipe = (recipeId) => {
    return fetch(`https://blessipe-api.herokuapp.com/recipes/${recipeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("bt_token")}`,
      },
    }).then(getRecipes);
  };

  const addRecipeKeyword = (recipeId, enteredKeyword) => {
    return fetch(
      `https://blessipe-api.herokuapp.com/recipekeywords/${recipeId}/add_recipe_keyword`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("bt_token")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          word: enteredKeyword,
        }),
      }
    ).then((response) => response.json());
  };

  const findLocalRestaurants = (recipeId) => {
    return fetch(
      `https://blessipe-api.herokuapp.com/recipes/${recipeId}/find_local_restaurants`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("bt_token")}`,
        },
      }
    ).then((response) => response.json());
    // .then(getRestaurants);
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        getRecipes,
        createRecipe,
        getRecipeById,
        editRecipe,
        deleteRecipe,
        addRecipeKeyword,
        findLocalRestaurants,
        // matchedRestaurants,
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};

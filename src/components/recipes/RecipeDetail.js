import React, { useState, useContext } from "react";
import { MatchList } from "./MatchList";

import "./Recipe.css";
import { RecipeContext } from "./RecipeProvider";

export const RecipeDetail = ({ recipe }) => {
  const {
    id,
    name,
    description,
    date,
    keywords,
    author,
    traveler,
    restaurant,
  } = recipe;

  const { getRecipes, addRecipeKeyword } = useContext(RecipeContext);

  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => setShowDetails(!showDetails);

  const [showKeyordEntry, setShowKeywordEntry] = useState(false);
  const toggleKeywordEntry = () => setShowKeywordEntry(!showKeyordEntry);

  const [enteredKeyword, setEnteredKeyword] = useState("");

  const [isLoading, setIsLoading] = useState(true); // eslint-disable-line no-unused-vars

  const handleKeywordEntryChange = (event) => {
    setEnteredKeyword(event.target.value);
  };
  const recipeId = id;

  const saveHandlerNewKeyword = (recipeId, enteredKeyword) => {
    setIsLoading(true);
    addRecipeKeyword(recipeId, enteredKeyword).then(() => {
      toggleKeywordEntry();
      setEnteredKeyword("");
      getRecipes();
    });
  };

  return (
    <>
      {showDetails ? (
        // If details are accessed: return post body
        <>
          <h2 className="recipe-name-switch" onClick={() => toggleDetails()}>
            {/* Show Details */}
            {name} from {restaurant.name} in {restaurant.city.name}
          </h2>
          <div className="detail--container">
            <div>
              <b className="recipe-author">
                Posted by {traveler.user.first_name} {traveler.user.last_name}
              </b>
            </div>
            <div>
              <b className="recipe-date">
                {new Date(date).toUTCString().split(" ").slice(0, 4).join(" ")}
              </b>
            </div>
            <br></br>
            <div className="recipe-description">{description}</div>
            <br></br>
            <div className="recipe-keywords">
              Keywords: {keywords?.map((keyword) => keyword.word).join(", ")}
            </div>
            {/* --------------- ADD KEYWORDS < --------------- */}
            {author ? (
              showKeyordEntry ? (
                <>
                  <input
                    type="text"
                    className="keyword__input"
                    name="new-keyword"
                    placeholder="Add a keyword..."
                    value={enteredKeyword}
                    onChange={handleKeywordEntryChange}
                  ></input>
                  <button
                    className="button save-button"
                    onClick={() => {
                      saveHandlerNewKeyword(recipeId, enteredKeyword);
                    }}
                  >
                    Save Keyword
                  </button>
                  <button
                    className="button cancel-button"
                    onClick={() => toggleKeywordEntry()}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="button add-keyword"
                    onClick={() => toggleKeywordEntry()}
                  >
                    Add Keyword
                  </button>
                </>
              )
            ) : null}
            {/* --------------- FIND MATCHES < --------------- */}
            <br></br>
            <MatchList recipe={recipe} key={`Match-List-${recipe.id}`} />
          </div>
          <br></br>
        </>
      ) : (
        // If details are hidden, only return name, location, date, and poster
        <>
          <h2 className="recipe-name-switch" onClick={() => toggleDetails()}>
            {/* Show Details */}
            {name} from {restaurant.name} in {restaurant.city.name}
          </h2>
          <div className="detail--container">
            <div>
              <b className="recipe-author">
                Posted by {traveler.user.first_name} {traveler.user.last_name}
              </b>
            </div>
            <div>
              <b className="recipe-date">
                {new Date(date).toUTCString().split(" ").slice(0, 4).join(" ")}
              </b>
            </div>
          </div>
          <br></br>
        </>
      )}
    </>
  );
};

import React, { useState } from "react";

export const CityContext = React.createContext();

export const CityProvider = (props) => {
  const [cities, setCities] = useState([]);

  const getCities = () => {
    return fetch("https://blessipe-api.herokuapp.com/cities", {
      // Authentication is no longer needed to retrieve cities!
      // headers: {
      //   Authorization: `Token ${localStorage.getItem("bt_token")}`,
      // },
    })
      .then((response) => response.json())
      .then(setCities);
  };

  return (
    <CityContext.Provider
      value={{
        cities,
        getCities,
      }}
    >
      {props.children}
    </CityContext.Provider>
  );
};

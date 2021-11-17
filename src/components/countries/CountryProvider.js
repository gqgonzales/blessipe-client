import React, { useState } from "react";

export const CountryContext = React.createContext();

export const CountryProvider = (props) => {
  const [countries, setCountries] = useState([]);

  const getCountries = () => {
    return fetch("https://blessipe-api.herokuapp.com/countries", {
      headers: {
        Authorization: `Token ${localStorage.getItem("bt_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setCountries);
  };

  return (
    <CountryContext.Provider
      value={{
        countries,
        getCountries,
      }}
    >
      {props.children}
    </CountryContext.Provider>
  );
};

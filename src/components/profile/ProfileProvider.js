import React, { useState } from "react";

export const ProfileContext = React.createContext();

export const ProfileProvider = (props) => {
  const [profile, setProfile] = useState({});

  const getProfile = () => {
    //   ONLY RETURN PROFILE OF CURRENTLY AUTHENTICATED USER
    return fetch("https://blessipe-api.herokuapp.com/profiles", {
      headers: {
        Authorization: `Token ${localStorage.getItem("bt_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setProfile);
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        getProfile,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

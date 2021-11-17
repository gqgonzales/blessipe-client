import React, { useState } from "react";

export const RestaurantContext = React.createContext();

export const RestaurantProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);

  const getRestaurants = () => {
    return fetch("https://blessipe-api.herokuapp.com/restaurants", {
      headers: {
        Authorization: `Token ${localStorage.getItem("bt_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setRestaurants);
  };

  const getRestaurantById = (restaurant_id) => {
    return fetch(
      `https://blessipe-api.herokuapp.com/restaurants/${restaurant_id}`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("bt_token")}`,
        },
      }
    ).then((response) => response.json());
  };

  const openRestaurant = (restaurant) => {
    return fetch("https://blessipe-api.herokuapp.com/restaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("bt_token")}`,
      },
      body: JSON.stringify(restaurant),
    }).then(getRestaurants);
    // .then();
  };

  const editRestaurant = (restaurant) => {
    return fetch(
      `https://blessipe-api.herokuapp.com/restaurants/${restaurant.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("bt_token")}`,
        },
        body: JSON.stringify(restaurant),
      }
    ).then(getRestaurants);
  };

  const closeRestaurant = (restaurant_id) => {
    return fetch(
      `https://blessipe-api.herokuapp.com/restaurants/${restaurant_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("bt_token")}`,
        },
      }
    ).then(getRestaurants);
  };

  const unfavoriteThisRestaurant = (restaurantId) => {
    return fetch(
      `https://blessipe-api.herokuapp.com/restaurants/${restaurantId}/favorite_restaurant`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("bt_token")}`,
        },
      }
    );
    // .then(getRestaurants);
  };

  const favoriteThisRestaurant = (restaurantId) => {
    return fetch(
      `https://blessipe-api.herokuapp.com/restaurants/${restaurantId}/favorite_restaurant`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("bt_token")}`,
        },
      }
    ).then((response) => response.json());
    // .then(getRestaurants);
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        getRestaurants,
        openRestaurant,
        getRestaurantById,
        editRestaurant,
        closeRestaurant,
        unfavoriteThisRestaurant,
        favoriteThisRestaurant,
      }}
    >
      {props.children}
    </RestaurantContext.Provider>
  );
};

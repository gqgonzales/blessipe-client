import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { CityContext } from "../cities/CityProvider";
import "./Auth.css";

export const Register = (props) => {
  const history = useHistory();

  // Our city selector for new users requires some special permissions on the Django side. Specifically, AllowAny.
  useEffect(() => {
    getCities();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { cities, getCities } = useContext(CityContext);

  const firstName = React.createRef();
  const lastName = React.createRef();
  const email = React.createRef();
  const bio = React.createRef();
  const password = React.createRef();
  const verifyPassword = React.createRef();
  const passwordDialog = React.createRef();
  const city = React.createRef();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: email.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        bio: bio.current.value,
        email: email.current.value,
        password: password.current.value,
        city: city.current.value,
      };

      return fetch("https://blessipe-api.herokuapp.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((res) => {
          if ("token" in res) {
            localStorage.setItem("bt_token", res.token);
            history.push("/my-recipes");
          }
        });
    } else {
      passwordDialog.current.showModal();
    }
  };

  return (
    <>
      <main style={{ textAlign: "center" }}>
        <dialog className="dialog dialog--password" ref={passwordDialog}>
          <div>Passwords do not match</div>
          <button
            className="button--close"
            onClick={(e) => passwordDialog.current.close()}
          >
            Close
          </button>
        </dialog>

        <form className="form--login" onSubmit={handleRegister}>
          <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
          <fieldset>
            <label htmlFor="firstName"> First Name </label>
            <input
              ref={firstName}
              type="text"
              name="firstName"
              className="form-control"
              placeholder="First name"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <label htmlFor="lastName"> Last Name </label>
            <input
              ref={lastName}
              type="text"
              name="lastName"
              className="form-control"
              placeholder="Last name"
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="inputEmail"> Email address </label>
            <input
              ref={email}
              type="email"
              name="email"
              className="form-control"
              placeholder="Email address"
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="inputPassword"> Password </label>
            <input
              ref={password}
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="verifyPassword"> Verify Password </label>
            <input
              ref={verifyPassword}
              type="password"
              name="verifyPassword"
              className="form-control"
              placeholder="Verify password"
              required
            />
          </fieldset>
          {/* ------------ CITY SELECT ------------ */}
          <fieldset>
            <label htmlFor="city"> Where are you located? </label>
            <select
              ref={city}
              type="select"
              name="city"
              className="form-control"
            >
              {cities.map((city) => {
                return (
                  <option value={city.id} key={`option-${city.id}`}>
                    {city.name}
                  </option>
                );
              })}
            </select>
          </fieldset>
          {/* ------------ CITY SELECT ------------ */}
          <fieldset>
            <label htmlFor="verifyPassword"> Bio </label>
            <textarea
              ref={bio}
              name="bio"
              className="form-control"
              placeholder="Let other travelers know a little bit about you!"
            />
          </fieldset>
          <fieldset
            style={{
              textAlign: "center",
            }}
          >
            <button className="btn btn-1 btn-sep icon-send" type="submit">
              Register
            </button>
          </fieldset>
        </form>
        <section className="link--register">
          Already registered? <Link to="/login">Login</Link>
        </section>
      </main>
    </>
  );
};

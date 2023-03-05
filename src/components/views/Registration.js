import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

const FormField = (props) => {
  return (
    <div className="login field">
      <label className="login label">{props.label}</label>
      <input
        className="login input"
        placeholder="enter here.."
        value={props.value}
        type={props.type}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
};

const Registration = (props) => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const register = async () => {
    try {
      const requestBody = JSON.stringify({ username, password });
      await api.post("/users", requestBody);
      const loginResponse = await api.post("/session", requestBody);

      // Store the token into the local storage.
      localStorage.setItem("token", loginResponse.data.token);
      localStorage.setItem("id", loginResponse.data.userid);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      history.push("/game");
    } catch (error) {
      alert("Invalide registration" + handleError(error));
    }
  };

  const navigateToLogin = () => {
    history.push("/login");
  };

  return (
    <BaseContainer>
      <div className="login container">
        <div className="login form">
          <h2 style={{ textAlign: "center" }}>Registration Page</h2>
          <FormField
            label="Username"
            value={username}
            onChange={(un) => setUsername(un)}
          />
          <FormField
            label="Password"
            value={password}
            type="password"
            onChange={(n) => setPassword(n)}
          />
          <div className="login-buttons-containers">
            <div className="login button-container">
              <Button
                disabled={!username || !password}
                width="100%"
                onClick={() => register()}
              >
                Register
              </Button>
            </div>
            <div className="login button-container">
              <Button width="100%" onClick={() => navigateToLogin()}>
                Go back to Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Registration;

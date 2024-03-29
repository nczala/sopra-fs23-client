import React, { useState } from "react";
import { api, apiWithAuth, handleError } from "helpers/api";
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormField = ({ label, value, type, onChange }) => {
  return (
    <div className="login field">
      <label className="login label">{label}</label>
      <input
        className="login input"
        placeholder="enter here.."
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
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

const Login = (props) => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({ username, password });
      const loginResponse = await api.post("/session", requestBody);
      console.log(loginResponse.data.token, loginResponse.data.userid);

      // Store the token into the local storage.
      localStorage.setItem("token", loginResponse.data.token);
      localStorage.setItem("id", loginResponse.data.userid);

      await apiWithAuth(loginResponse.data.token).get(
        `/users/${loginResponse.data.userid}`
      );

      // Login successfully worked --> navigate to the route /game in the GameRouter
      history.push("/game");
    } catch (error) {
      alert(`Invalid username or password \n${handleError(error)}`);
    }
  };

  const navigateToRegistration = () => {
    history.push("/register");
  };

  return (
    <BaseContainer>
      <div className="login container">
        <div className="login form">
          <h2 style={{ textAlign: "center" }}>Login Page</h2>
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
          <div className="login-buttons-container">
            <div className="login button-container">
              <Button
                disabled={!username || !password}
                width="100%"
                onClick={() => doLogin()}
              >
                Login
              </Button>
            </div>
            <div className="login button-container">
              <Button width="100%" onClick={() => navigateToRegistration()}>
                Register
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
export default Login;

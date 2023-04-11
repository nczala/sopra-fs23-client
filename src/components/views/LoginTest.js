import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/LoginTest.scss";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */

const FormField = ({ label, value, type, onChange }) => {
  return (
    <div className="form-field">
      <input
        className="form-field input"
        placeholder={label}
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

const DropDown = ({ label, value, options, onChange }) => {
  return (
    <div className="form-field">
      <label htmlFor="dropdown" className="form-field label">
        {label}{" "}
      </label>
      <select
        className="form-field input"
        id="dropdown"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ paddingTop: "5px" }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const Login = (props) => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("en");

  const options = [
    { value: "en", label: "English" },
    { value: "de", label: "German" },
    { value: "fr", label: "French" },
  ];
  const doLogin = () => {
    console.log("test");
  };

  const doRegister = () => {
    console.log("test");
  };

  return (
    <BaseContainer>
      <div className="logintest">
        <div className="subcontainer header-container">
          <h1>Login</h1>
          <h2>Sign in to your account</h2>
          <p>
            or{" "}
            <span style={{ color: "blue", cursor: "pointer" }}>register</span> a
            new account
          </p>
        </div>
        <div className="subcontainer form-container">
          <FormField
            label="username"
            value={username}
            onChange={(un) => setUsername(un)}
          ></FormField>
          <FormField
            label="password"
            value={password}
            type="password"
            onChange={(n) => setPassword(n)}
          ></FormField>
          <DropDown
            label={"Choose your prefered language"}
            value={language}
            options={options}
            onChange={(l) => setLanguage(l)}
          ></DropDown>
        </div>
        <div className="subcontainer button-container">
          <button className="button" onClick={() => console.log(language)}>
            Login
          </button>
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

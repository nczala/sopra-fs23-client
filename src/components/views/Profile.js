// import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Profile.scss";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";
import FormField from "components/views/Login";
import { api, handleError } from "helpers/api";

const Profile = (props) => {
  const history = useHistory();
  const user = props.location.state.user;

  const [edit, setEdit] = useState(false);
  const [auth, setAuth] = useState(false);

  const [username, setUsername] = useState(user.username);
  const [birthday, setBirthday] = useState(user.birthday);

  useEffect(() => {
    if (checkUserToken()) {
      console.log("right user, show Edit Button");
      setAuth(!auth);
    }
  }, []);

  const checkUserToken = () => {
    return localStorage.getItem("token") === user.token;
  };

  const handleClick = async () => {
    try {
      const requestBody = JSON.stringify({
        id: user.id,
        token: user.token,
        username: username,
        birthday: birthday,
      });
      await api.put("/users", requestBody);

      console.log("API.PUT");
      history.push("/game");
    } catch (error) {
      console.log(username);
      console.log(birthday);
      alert(`Could not change user Data \n${handleError(error)}`);
    }
  };

  return (
    <BaseContainer>
      <div className="login container" style={{ width: 500 }}>
        <div className="login form">
          {auth ? "Your Profile" : user.username + "'s Profile"}
          {!edit && (
            <ul className="game user-list">
              <div className="profile property-list entry">
                <span>Username:</span>
                <span>{user.username}</span>
              </div>
              <div className="profile property-list entry">
                <span>Status:</span>
                <span
                  style={{ color: user.status === "ONLINE" ? "green" : "red" }}
                >
                  {user.status}
                </span>
              </div>
              <div className="profile property-list entry">
                <span>Creation Date:</span>
                <span>{user.creationDate}</span>
              </div>
              <div className="profile property-list entry">
                <span>Birthday:</span>
                <span>{user.birthday}</span>
              </div>
            </ul>
          )}
          {edit && (
            <div>
              <div className="login field">
                <label className="login label">{"Username"}</label>
                <input
                  className="login input"
                  placeholder="enter here.."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="login field">
                <label className="login label">{"Birthday"}</label>
                <input
                  className="login input"
                  placeholder="enter here.."
                  type="date"
                  value={birthday === null ? "" : birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </div>
              <Button
                disabled={
                  user.username == username && user.birthday == birthday
                }
                style={{ marginBottom: "5px" }}
                onClick={() => handleClick()}
              >
                Save Changes
              </Button>
            </div>
          )}
          {auth && (
            <Button onClick={() => setEdit(!edit)}>
              {!edit ? "Edit" : "Go Back"}
            </Button>
          )}
        </div>
      </div>
    </BaseContainer>
  );
};

const Profiless = (props) => {
  // const history = useHistory();
  const user = props.location.state.user;
  console.log(user);

  const [editMode, setEditMode] = useState(false);

  const switchToEdit = () => {
    console.log("pressed");
    setEditMode((value) => !value);
  };

  function renderTags() {
    if (editMode === true)
      return <ProfileOnEdit>{(user, switchToEdit)}</ProfileOnEdit>;
    return (
      <div className="profile container">
        <Button onClick={switchToEdit}>Edit</Button>
        <ul className="profile property-list">
          <div className="profile property-list entry">
            <span>Username:</span>
            <span>{user.username}</span>
          </div>
          <div className="profile property-list entry">
            <span>Status:</span>
            <span>{user.status}</span>
          </div>
          <div className="profile property-list entry">
            <span>Creation Date:</span>
            <span>{user.creationDate}</span>
          </div>
          <div className="profile property-list entry">
            <span>Birthday:</span>
            <span>{user.birthday}</span>
          </div>
        </ul>
      </div>
    );
  }

  return <BaseContainer>{renderTags()}</BaseContainer>;
};

const ProfileOnEdit = (props) => {
  const user = props.children;
  console.log(user);

  return (
    <div className="profile container">
      <Button onClick={props.switchToEdit}>Back</Button>
      <ul className="profile property-list">
        <div className="profile property-list entry">
          <span>Username:</span>
          <span>{user.username}</span>
        </div>
        <div className="profile property-list entry">
          <span>Birthday:</span>
          <span>{user.birthday}</span>
        </div>
      </ul>
    </div>
  );
};

const Profiles = (props) => {
  // const history = useHistory();
  const user = props.location.state.user;
  console.log(user);

  const handleClick = () => {};

  return (
    <BaseContainer>
      <div className="profile container">
        <ul className="profile property-list">
          {Object.entries(user)
            .filter(([_, val], index) => val !== undefined)
            .map(([key, val], index) => (
              <div key={index}>
                {key}: {val}
              </div>
            ))}
        </ul>
        <Button>Edit Profile</Button>
      </div>
    </BaseContainer>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
};

export default Profile;

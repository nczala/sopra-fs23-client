import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Profile.scss";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";
import { apiWithAuth, handleError } from "helpers/api";

const EditableProfile = ({ user, setUser, setInEditMode }) => {
  const [birthday, setBirthday] = useState(user.birthday);
  const [username, setUsername] = useState(user.username);

  const handleClick = async () => {
    try {
      const requestBody = JSON.stringify({
        username: username,
        birthday: birthday,
      });
      const token = localStorage.getItem("token");
      const response = await apiWithAuth(token).put(
        `/users/${user.id}`,
        requestBody
      );
      setUser(response.data);
      setInEditMode(false);
    } catch (error) {
      alert(`Could not change user Data \n${handleError(error)}`);
    }
  };

  return (
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
        disabled={user.username === username && user.birthday === birthday}
        style={{ marginBottom: "5px" }}
        onClick={() => handleClick()}
      >
        Save Changes
      </Button>
    </div>
  );
};

const NonEditableProfile = ({ user }) => {
  return (
    <ul className="game user-list">
      <div className="profile property-list entry">
        <span>Username:</span>
        <span>{user.username}</span>
      </div>
      <div className="profile property-list entry">
        <span>Status:</span>
        <span style={{ color: user.status === "ONLINE" ? "green" : "red" }}>
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
  );
};

const Profile = (props) => {
  const history = useHistory();
  const [user, setUser] = useState({ username: "" });

  const [inEditMode, setInEditMode] = useState(false);
  const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(false);

  useEffect(() => {
    const userid = props.location.state.userid;

    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const response = await apiWithAuth(token).get(`/users/${userid}`);
        const userToDisplay = response.data;
        setUser(() => userToDisplay);

        if (isEditEnabled(userid)) {
          setIsCurrentUserProfile(() => true);
        }
      } catch (error) {
        console.error(`${handleError(error)}`);
        alert(`Could not fetch user with ${userid}.`);
      }
    }

    fetchData();
  }, [props]);

  const isEditEnabled = (toBeEditedUserId) => {
    const currentUserId = parseInt(localStorage.getItem("id"));
    return toBeEditedUserId === currentUserId;
  };

  return (
    <BaseContainer>
      <div className="login container" style={{ width: 500, height: "20em" }}>
        <div className="login form">
          <h3>
            {isCurrentUserProfile
              ? "Your Profile"
              : user.username + "'s Profile"}
          </h3>
          {!inEditMode && <NonEditableProfile user={user} />}
          {inEditMode && (
            <EditableProfile
              user={user}
              setUser={setUser}
              setInEditMode={setInEditMode}
            />
          )}
          {isCurrentUserProfile && (
            <Button onClick={() => setInEditMode(!inEditMode)}>
              {!inEditMode ? "Edit" : "Go Back"}
            </Button>
          )}
          {!inEditMode && (
            <Button
              onClick={() => history.push("/game")}
              style={{ marginTop: "5px" }}
            >
              Back to User Overview
            </Button>
          )}
        </div>
      </div>
    </BaseContainer>
  );
};

export default Profile;

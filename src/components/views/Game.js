import { useEffect, useState } from "react";
import { apiWithAuth, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import { useHistory } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
//import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const Player = ({ user }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`./profile/${user.id}`, { userid: user.id });
  };

  return (
    <div
      onClick={() => handleClick()}
      className={
        parseInt(localStorage.getItem("id")) === user.id
          ? "player container logged-out"
          : "player container logged-in"
      }
    >
      <div className="player username">{user.username}</div>
      <div className="player id">id: {user.id}</div>
    </div>
  );
};

Player.propTypes = {
  user: PropTypes.object,
};

const Game = () => {
  // use react-router-dom's hook to access the history
  const history = useHistory();

  // define a state variable (using the state hook).
  // if this variable changes, the component will re-render, but the variable will
  // keep its value throughout render cycles.
  // a component can have as many state variables as you like.
  // more information can be found under https://reactjs.org/docs/hooks-state.html
  const [users, setUsers] = useState(null);

  const logout = () => {
    const token = localStorage.getItem("token");
    apiWithAuth(token).delete("/session");
    localStorage.clear();
    history.push("/login");
  };

  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const response = await apiWithAuth(token).get("/users");

        // delays continuous execution of an async operation for 1 second.
        // This is just a fake async call, so that the spinner can be displayed
        // feel free to remove it :)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get the returned users and update the state.
        setUsers(response.data);
      } catch (error) {
        console.error(
          `Something went wrong while fetching the users: \n${handleError(
            error
          )}`
        );
        console.error("Details:", error);
        alert(
          "Something went wrong while fetching the users! See the console for details."
        );
      }
    }

    fetchData();
  }, []);

  let content = <Spinner />;

  if (users) {
    content = (
      <div className="game">
        <ul className="game user-list">
          {users.map((user) => (
            <Player user={user} key={user.id} />
          ))}
        </ul>
        <Button width="100%" onClick={() => logout()}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <BaseContainer className="game container">
      <h2>Registered Users</h2>
      <p className="game paragraph">Get all users from secure endpoint:</p>
      {content}
      <Button width="100%" onClick={() => history.push("/drawingboard")}>
        Drawing Board
      </Button>
    </BaseContainer>
  );
};

export default Game;

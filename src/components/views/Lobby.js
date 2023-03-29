import { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import { useHistory } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
//import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const LobbyRoom = ({ lobby }) => {
  return (
    <div className="player container logged-out">
      <div className="player username">{lobby.lobbyName}</div>
      <div className="player id">id: {lobby.id}</div>
    </div>
  );
};

const Lobby = () => {
  // use react-router-dom's hook to access the history
  const history = useHistory();

  // define a state variable (using the state hook).
  // if this variable changes, the component will re-render, but the variable will
  // keep its value throughout render cycles.
  // a component can have as many state variables as you like.
  // more information can be found under https://reactjs.org/docs/hooks-state.html
  const [lobbies, setLobbies] = useState(null);

  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
      try {
        const response = await api.get("/lobbies");
        console.log(response.data);
        // delays continuous execution of an async operation for 1 second.
        // This is just a fake async call, so that the spinner can be displayed
        // feel free to remove it :)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get the returned users and update the state.
        setLobbies(response.data);
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

  if (lobbies) {
    content = (
      <div className="game">
        <ul className="game user-list">
          {lobbies.map((lobby) => (
            <LobbyRoom lobby={lobby} key={lobby.id} />
          ))}
        </ul>
      </div>
    );
  }

  function addLobby() {
    const requestBody = JSON.stringify({ lobbyName: "lobbyName" });
    api.post("/lobbies", requestBody);
  }

  async function refreshLobby() {
    await getLobbies();
  }

  async function getLobbies() {
    const response = await api.get("/lobbies");
    setLobbies(response.data);
  }

  return (
    <BaseContainer className="game container">
      <h2>Registered Lobbies</h2>
      <p className="game paragraph">Get all users from secure endpoint:</p>
      {content}
      <Button width="10%" onClick={() => addLobby()}>
        add lobby+
      </Button>
      <Button width="10%" onClick={() => refreshLobby()}>
        refresh
      </Button>
      <Button width="10%" onClick={() => history.push("/game")}>
        Go Back
      </Button>
    </BaseContainer>
  );
};

export default Lobby;

import "styles/views/LobbyView.scss";
import { useHistory } from "react-router-dom";

const LobbyItem = ({ lobby, handleClick }) => {
  return (
    <div className="sub-container sub-container-list list">
      <div
        onClick={() => handleClick(lobby)}
        className="sub-container sub-container-list list name"
      >
        {lobby.lobbyName}
      </div>
      <div className="sub-container sub-container-list list size">
        {lobby.lobbySize}
      </div>
    </div>
  );
};

const LobbyView = () => {
  const history = useHistory();

  const lobbies = {
    object1: {
      lobbyName: "UZH",
      lobbySize: 2,
    },
    object2: {
      lobbyName: "The Badehosen",
      lobbySize: 4,
    },
    object3: {
      lobbyName: "The legendary Legends",
      lobbySize: 3,
    },
    object4: {
      lobbyName: "UZH",
      lobbySize: 2,
    },
    object5: {
      lobbyName: "The Badehosen",
      lobbySize: 4,
    },
    object6: {
      lobbyName: "The legendary Legends",
      lobbySize: 3,
    },
    object7: {
      lobbyName: "UZH",
      lobbySize: 2,
    },
    object8: {
      lobbyName: "The Badehosen",
      lobbySize: 4,
    },
    object9: {
      lobbyName: "The legendary Legends",
      lobbySize: 3,
    },
    object10: {
      lobbyName: "UZH",
      lobbySize: 20,
    },
    object11: {
      lobbyName: "The Badehosen",
      lobbySize: 4,
    },
  };

  const lobbyArray = Object.values(lobbies);
  console.log(lobbyArray);

  function handleClick(lobby) {
    if (window.confirm(`join ${lobby.lobbyName} ?`)) {
      // Perform the action here
    }
  }

  const navigateToLobbySettings = () => {
    history.push("/lobbysettings");
  };

  return (
    <div className="main-container">
      <div className="sub-container sub-container-header">
        <h1>Lobby Overview</h1>
        <h2>Join a lobby by clicking on the name</h2>
      </div>
      <div className="sub-container sub-container-list">
        <div className="sub-container sub-container-list header">
          <div className="sub-container sub-container-list header name">
            Lobbies
          </div>
          <div className="sub-container sub-container-list header size">
            Group Size
          </div>
        </div>
        {lobbyArray.map((lobby) => (
          <LobbyItem
            lobby={lobby}
            handleClick={handleClick}
            key={lobby.lobbyName}
          ></LobbyItem>
        ))}
      </div>
      <div className="sub-container sub-container-buttons">
        <button className="sub-container sub-container-buttons button one">
          REFRESH
        </button>
        <button
          onClick={navigateToLobbySettings}
          className="sub-container sub-container-buttons button two"
        >
          CREATE A NEW LOBBY
        </button>
        <button className="sub-container sub-container-buttons button three">
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default LobbyView;
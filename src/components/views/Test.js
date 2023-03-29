import "styles/views/Test.scss";

const LobbyItem = ({ lobby }) => {
  return (
    <div className="lobby list-item-row">
      <div className="lobby list-item lobby-name">{lobby.lobbyName}</div>
      <div className="lobby list-item">{lobby.lobbySize}</div>
    </div>
  );
};

const Test = () => {
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
  };

  const lobbyArray = Object.values(lobbies);
  console.log(lobbyArray);

  return (
    <div className="lobby container">
      <h1>Lobby Overview</h1>
      <h2>Join a lobby by clicking on the name</h2>
      <div className="lobby list-item-row">
        <h2 className="lobby lobbyTitle lobbyName">Lobbies</h2>
        <h2 className="lobby lobbyTitle lobbySize">Lobby Size</h2>
      </div>
      {lobbyArray.map((lobby) => (
        <LobbyItem
          className="lobby list"
          lobby={lobby}
          key={lobby.lobbyName}
        ></LobbyItem>
      ))}
      <div>
        <button className="lobby refresh-button">refresh</button>
        <button className="lobby create-button">create lobby</button>
        <button className="lobby logout-button">logout</button>
      </div>
    </div>
  );
};

export default Test;

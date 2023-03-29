import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "styles/views/LobbySettings.scss";

const LobbySettings = () => {
  const history = useHistory();

  const [lobbyName, setLobbyName] = useState(null);
  const [selectedTime, setSelectedTime] = useState(30);
  const [selectedRounds, setSelectedRound] = useState(1);
  const [selectedNrOfPlayers, setSelectedNrOfPlayers] = useState(5);

  return (
    <div className="lobbysettings">
      <h2>Lobby Settings</h2>
      <EntryField
        type={"text"}
        label={"Lobby Name"}
        value={lobbyName}
        onChange={(ln) => setLobbyName(ln)}
      ></EntryField>
      <label>
        <RangeSelection
          setter={setSelectedTime}
          state={selectedTime}
          min={"10"}
          max={"60"}
          step={"5"}
        ></RangeSelection>
        seconds per round: <span>{selectedTime}</span>
      </label>
      <label>
        <RangeSelection
          setter={setSelectedRound}
          state={selectedRounds}
          min={"1"}
          max={"10"}
          step={"1"}
          disabled={"true"}
        ></RangeSelection>
        number of rounds: <span>{selectedRounds}</span>
      </label>
      <label>
        <RangeSelection
          setter={setSelectedNrOfPlayers}
          state={selectedNrOfPlayers}
          min={"2"}
          max={"5"}
          step={"1"}
        ></RangeSelection>
        max number of players: <span>{selectedNrOfPlayers}</span>
      </label>
      <div className="lobbysettings button-container">
        <button
          className="lobbysettings button-container button cancel"
          onClick={() => history.push("/lobbyoverview")}
        >
          CANCEL
        </button>
        <button className="lobbysettings button-container button confirm">
          CONFIRM
        </button>
      </div>
    </div>
  );
};

export default LobbySettings;

const RangeSelection = ({ setter, state, min, max, step, disabled }) => {
  return (
    <input
      className=""
      type="range"
      min={min}
      max={max}
      value={state}
      step={step}
      disabled={disabled}
      onChange={(e) => setter(parseInt(e.target.value))}
    ></input>
  );
};

const EntryField = ({ type, value, onChange }) => {
  return (
    <div className="lobbyname">
      <label className="lobbyname label">
        <span>Lobby Name</span>
      </label>
      <input
        className="lobbyname input"
        placeholder="enter here ..."
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

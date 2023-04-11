import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GameGuard } from "components/routing/routeProtectors/GameGuard";
import GameRouter from "components/routing/routers/GameRouter";
import { LoginGuard } from "components/routing/routeProtectors/LoginGuard";
import Login from "components/views/Login";
import Registration from "components/views/Registration";
import DrawingBoard from "components/views/DrawingBoard";
import Lobby from "components/views/Lobby";
import Test from "components/views/Test";
import LobbyView from "components/views/LobbyView";
import LobbySettings from "components/views/LobbySettings";
import GameView from "components/views/GameView";
import LoginTest from "components/views/LoginTest";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/game">
          <GameGuard>
            <GameRouter base="/game" />
          </GameGuard>
        </Route>
        <Route exact path="/login">
          <LoginGuard>
            <Login />
          </LoginGuard>
        </Route>
        <Route exact path="/register">
          <LoginGuard>
            <Registration />
          </LoginGuard>
        </Route>
        <Route exact path="/drawingboard">
          <DrawingBoard />
        </Route>
        <Route exact path="/lobbyoverview">
          <LobbyView />
        </Route>
        <Route exact path="/lobbysettings">
          <LobbySettings />
        </Route>
        <Route exact path="/gameview">
          <GameView />
        </Route>
        <Route exact path="/logintest">
          <LoginTest />
        </Route>
        <Route exact path="/test">
          <Test />
        </Route>
        <Route exact path="/lobbies">
          <Lobby />
        </Route>
        <Route exact path="/">
          <Redirect to="/game" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

/*
 * Don't forget to export your component!
 */
export default AppRouter;

import React from "react";
import { Router, Link, Route } from "react-router-dom";
import { Timer, Home, Recipe } from "./pages";

import "./App.css";
// import IfOffline from "./components";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";
import IfOffline from "./components/IfOffline";

const history = createBrowserHistory();

ReactGA.initialize("UA-000000-01");
ReactGA.pageview(window.location.pathname + window.location.search);

history.listen(() => {
  ReactGA.pageview(window.location.pathname + window.location.search);
});

const App = () => (
  <Router history={history}>
    <div>
      <header>
        <Link to="/">
          Recetas<IfOffline>Offline :-/</IfOffline>
        </Link>
      </header>
      <main>
        <Route exact path="/" component={Home} />
        <Route path="/recipe/:recipeId" component={Recipe} />
        <Route path="/timer" component={Timer} />
      </main>
    </div>
  </Router>
);

export default App;

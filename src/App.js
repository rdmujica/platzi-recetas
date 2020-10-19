import React from "react";
import { Router, Link, Route } from "react-router-dom";
import { Timer, Home, Recipe } from "./pages";
import Home2 from "./pages/Home2";
import "./App.css";
// import IfOffline from "./components";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";

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
        <Link to="/">Recetas</Link>
      </header>
      <main>
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/home2" component={Home2} />
        <Route path="/recipe/:recipeId" component={Recipe} />
        <Route path="/timer" component={Timer} />
      </main>
    </div>
  </Router>
);

export default App;

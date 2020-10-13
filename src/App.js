import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { Timer, Home, Recipe } from "./pages";
import "./App.css";

const App = () => (
  <BrowserRouter>
    <div>
      <header>
        <Link to="/">Recetas</Link>
      </header>
      <main>
        <Route exact path="/" component={Home} />
        <Route path="/recipe/:recipeId" component={Recipe} />
        <Route path="/timer" component={Timer} />
      </main>
    </div>
  </BrowserRouter>
);

export default App;

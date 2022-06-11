import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom"

import { Crud } from "./pages/crud";
import { Authentication } from "./pages/authentication";

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Crud />
          </Route>
          <Route exact path="/auth">
            <Authentication />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
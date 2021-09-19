import React from "react";
import { Route, Switch } from "react-router";
import { CarMain } from "../Components/CarMain";
import { DetailsPage } from "../Components/DetailsPage";
function Routes() {
  return (
    <Switch>
      <Route path="/" exact>
        <CarMain />
      </Route>

      <Route path="/:id" exact>
        <DetailsPage />
      </Route>

    </Switch>
  );
}

export { Routes };

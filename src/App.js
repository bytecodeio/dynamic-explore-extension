import React from "react";
import { ExtensionProvider } from "@looker/extension-sdk-react";
import { hot } from "react-hot-loader/root";

import { Main } from "./Main";
import { Main2 } from "./Main2";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { APP_ROUTE } from "./utils/constants2";
import { AdminPage } from "./components/Admin";
import { PrintPage } from "./components/PrintPage"

export const App = hot(() => {
  return (
    <ExtensionProvider>
      <Switch>
      <Route exact path='/print'>
          <PrintPage />
        </Route>
        <Route exact path='/admin'>
          <AdminPage />
        </Route>
        <Route path='/:path/'>
          <Main2 />
        </Route>
        <Route exact path="/">
          <Main2 />
        </Route>
        {/* <Redirect push from="/" to={APP_ROUTE} /> */}
      </Switch>
    </ExtensionProvider>
  );
});

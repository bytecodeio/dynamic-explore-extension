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

export const App = hot(() => {
  return (
    <ExtensionProvider>
      <Switch>
        <Route path='/:path'>
          <Main2 />
        </Route>
        <Route exact path="/">
          <Main />
        </Route>
        {/* <Redirect push from="/" to={APP_ROUTE} /> */}
      </Switch>
    </ExtensionProvider>
  );
});

import React from "react";
import { ExtensionProvider } from "@looker/extension-sdk-react";
import { hot } from "react-hot-loader/root";
import { Main } from "./Main";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import { AdminPage } from "./components/Admin";
import { PrintPage } from "./components/PrintPage"
import { InitialPage } from "./InitialPage";

export const App = hot(() => {
  return (
    // Data download timeout is the chattyTimeout
    <ExtensionProvider chattyTimeout={10000000}>
      <Switch>
        {/*Route for Print page for exporting a visualization*/}
        <Route exact path='/print'>
          <PrintPage />
        </Route>
        {/*Route for Admin page for updating the context data*/}
        <Route exact path='/admin'>
          <AdminPage />
        </Route>
        <Route path='/:path/'>
          <Main />
        </Route>
        {/*Route for InitialPage page which decides whether to go to Main2 or Landing Page*/}
        <Route exact path="/">
          <InitialPage />
        </Route>
        {/* <Redirect push from="/" to={APP_ROUTE} /> */}
      </Switch>
    </ExtensionProvider>
  );
});

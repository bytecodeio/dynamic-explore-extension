
import React, {useState} from "react";
import { ExtensionProvider } from "@looker/extension-sdk-react";
import { hot } from "react-hot-loader/root";

import { NewTable } from "./pages/NewTable/NewTable";
import { LandingPage } from "./pages/LandingPage/LandingPage";


export const App =  hot(() => {

  const PAGES = {
    NEW_COHORT: 'NEW_COHORT',
    LANDING_PAGE : 'LANDING_PAGE'
  }


  let startDate = new Date();
  let endDate = new Date();
  startDate.setDate(startDate.getDate() - 31);

  // This is an example of Initial Cohort builder with UI Filters and dashboard
  // const [currentPage, setCurrentPage] = useState(PAGES.NEW_COHORT)

  const [currentPage, setCurrentPage] = useState(PAGES.LANDING_PAGE)

  const [authRequest, setAuthRequest] = useState({
    set_name:"",
    preferred_language:[],
    primary_payor:[],
    start_date : startDate,
    end_date: endDate,
    pat_gender:[],
    pat_race:[],
    ethnicity:[],
    starage:0,
    endage:0,
    to_months:true
  });

  const renderPage = () => {
    switch(currentPage) {
      case PAGES.NEW_COHORT:
        return <NewTable setCurrentPage={setCurrentPage} authRequest={authRequest} setAuthRequest={setAuthRequest} />;
      case PAGES.LANDING_PAGE:
        return <LandingPage />;
      default:
        return <NewTable setCurrentPage={setCurrentPage} />;
    }
  }

  return (
    <ExtensionProvider>

    <div>
      {renderPage()}
    </div>

    </ExtensionProvider>
  );
});

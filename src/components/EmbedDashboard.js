import React, { useCallback, useContext } from "react";
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { ExtensionContext } from "@looker/extension-sdk-react";
import styled from "styled-components";
import { Spinner } from "react-bootstrap";

import { ApplicationContext } from "../Main2";
import { useEffect } from "react";

const Explore = styled.div`
  width: 100%;
  min-height: unset;
  & > iframe {
    width: 100%;
    height: 150%;
    max-height: none;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmbedDashboard = ({ dashboardId }) => {
  const { extensionSDK } = useContext(ExtensionContext);

  const embedCtrRef = useCallback(
    (el) => {
      const hostUrl = extensionSDK.lookerHostData.hostUrl;
      if (el && hostUrl && dashboardId) {
        el.innerHTML = "";
        LookerEmbedSDK.init(hostUrl);
        LookerEmbedSDK.createDashboardWithId(dashboardId)
          .appendTo(el)          
          .build()
          .connect()
          .catch((error) => {
            console.error("Connection error", error);
          });
      }
    },
    [dashboardId]
  );

  return (
    <>{dashboardId ? <Explore ref={embedCtrRef} /> : <Spinner />}</>
  );
};

export default EmbedDashboard;

import React, { useState, useCallback, useContext } from "react";
import {Space, FieldText , Button, Form, Heading, SpaceVertical } from "@looker/components";
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { ExtensionContext } from "@looker/extension-sdk-react";
import styled from "styled-components";


export const EmbedMultiExplores = (props) => {

    const cohort1 = props.cohort1
    const cohort2 = props.cohort2
    const compSel = props.compSel
    // const [absoluteUrl, setAbsoluteUrl] = useState("")
    let absoluteUrl1 = ""
    let absoluteUrl2 = ""


const { extensionSDK } = useContext(ExtensionContext);

const NewTableResults1 = useCallback(
    (embedContainer) => {
      const hostUrl1 = extensionSDK.lookerHostData?.hostUrl;
      // alert(createnew)
      if (embedContainer && hostUrl1 && compSel=="true") {
        embedContainer.innerHTML = "";

        const sel_cohort1 = cohort1;
        const embedUrl1 = `${hostUrl1}/embed/explore/<model>/<explore>?${sel_cohort1}&embed_domain=${hostUrl1}&sdk=2&sandboxed_host=true&toggle=dat,vis`
        LookerEmbedSDK.init(hostUrl1);
        LookerEmbedSDK.createExploreWithUrl(embedUrl1)
          .appendTo(embedContainer)
          .on("explore:state:changed", (e) => {
            console.log(
              "An Explore page URL has changed as a result of the user’s actions."
            );
            // console.log(e.explore.absoluteUrl);
            absoluteUrl1 = (e.explore.absoluteUrl)
          })
          .build()
          .connect()
          .then(() => {})
          .catch((e) => console.error(e));
      }
    }
  );


const NewTableResults2 = useCallback(
        (embedContainer2) => {
          const hostUrl2 = extensionSDK.lookerHostData?.hostUrl;
          // alert(createnew)
          if (embedContainer2 && hostUrl2 && compSel=="true") {
            embedContainer2.innerHTML = "";

            const sel_cohort2 = cohort2;
            const embedUrl2 = `${hostUrl2}/embed/explore/<model>/<explore>?${sel_cohort2}&embed_domain=${hostUrl2}&sdk=2&sandboxed_host=true&toggle=dat,vis`
            LookerEmbedSDK.init(hostUrl2);
            LookerEmbedSDK.createExploreWithUrl(embedUrl2)
              .appendTo(embedContainer2)
              .on("explore:state:changed", (e) => {
                console.log(
                  "An Explore page URL has changed as a result of the user’s actions."
                );
                // console.log(e.explore.absoluteUrl);
                absoluteUrl2 = (e.explore.absoluteUrl)
              })
              .build()
              .connect()
              .then(() => {})
              .catch((e) => console.error(e));
          }
        }
      );



return (
        <>
        <SpaceVertical align="start"  border={{}}>
            <Explore1 ref={NewTableResults1} />
            <Explore2 ref={NewTableResults2} />
        </SpaceVertical>
        </>
     );
    };


    // A little bit of style here for heights and widths.
    const Explore1 = styled.div`
    width: 100%;
    height: 50vh;
    & > iframe {
      width: 100%;
      height: 100%;
    }
    `;

    const Explore2 = styled.div`
      width: 100%;
      height: 50vh;
      & > iframe {
        width: 100%;
        height: 100%;
      }
    `;

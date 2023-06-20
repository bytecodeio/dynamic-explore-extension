import React, { useState, useCallback, useContext,useEffect  } from "react";
import {Space, FieldText , Button, Form, Heading, SpaceVertical } from "@looker/components";
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { ExtensionContext } from "@looker/extension-sdk-react";
import styled from "styled-components";
import { connection, scratch_schema } from "../../../utils/writebackConfig";
import { values } from "lodash";


export const EmbedExplore = ({createnew, userId, saveClicked, setSaveClicked }) => {

    let absoluteUrl = ""
    let slug = ""

// const [saveClicked, setSaveClicked ] = useState(false)
const { extensionSDK, core40SDK } = useContext(ExtensionContext);

const NewTableResults = useCallback(
    (embedContainer) => {
      const hostUrl = extensionSDK.lookerHostData?.hostUrl;
      if (embedContainer && hostUrl && createnew=="true") {
        embedContainer.innerHTML = "";
        const embedUrl = `${hostUrl}/embed/explore/lookml_foundations/order_items?embed_domain=${hostUrl}&sdk=2&sandboxed_host=true`
        LookerEmbedSDK.init(hostUrl);

        LookerEmbedSDK.createExploreWithUrl(embedUrl)
          .appendTo(embedContainer)
          .on("explore:state:changed", (e) => {
            console.log(
              "An Explore page URL has changed as a result of the user’s actions."
            );
            absoluteUrl = (e.explore.absoluteUrl)
            console.log(absoluteUrl)

            if (absoluteUrl.includes("qid=") && absoluteUrl.includes("&origin="))
              {
              slug = (absoluteUrl.substring(absoluteUrl.search("qid="),absoluteUrl.search("&origin="))).substring(4,26);
              }
            else if (absoluteUrl.includes("qid="))
              {
              slug = (absoluteUrl.substring(absoluteUrl.search("qid="))).substring(4,26);
              }
            console.log("test " , slug)
          })
          .build()
          .connect()
          .then(() => {})
          .catch((e) => console.error(e));
      }

      // setSaveClicked(false)
    }
  ,[saveClicked]);

  const addNewTable = (sdk, cohort_name, looker_user_id, query_slug, expanded_url ) => {
    const asyncFunction = async () => {

      const slugResponse = await sdk.ok(
        sdk.create_sql_query({
          connection_name: connection,

          sql: `insert into ${scratch_schema}.user_cohorts (
            cohort_name ,
            looker_user_id ,
            query_slug ,
            expanded_url ,
            created_date
            )
            select cohort, userid ,query , url, CURRENT_DATETIME("UTC")
            from (select '${cohort_name}' as cohort, ${looker_user_id} as userid,
            '${query_slug}' as query, '${expanded_url}' as url)
            left join ${scratch_schema}.user_cohorts
            on cohort_name = cohort where cohort_name IS NUll
            `
        })
      );

      const response = await sdk.ok(
        sdk.run_sql_query(slugResponse.slug, "inline_json")
      );

      // console.log('response before return')

      return response;
    };
    return asyncFunction();
  };

  const handleSubmit = async (e) => {

        e.preventDefault();

        let cohortName = e.target.cohortname.value
        console.log("e == ", e.target.cohortname.value, slug)


          const response  = await core40SDK.ok(
            core40SDK.query_for_slug(slug)
          )

          let expanded_share_url = response.expanded_share_url.split("?")[1]

          if (cohortName && userId && slug && expanded_share_url )
          {
          addNewTable(core40SDK, cohortName, userId, slug, expanded_share_url)
          let successMsg = "Your Cohort has been Saved!!"
          }
          setSaveClicked(true)
      };




return (
        <>

        {saveClicked ? (<div justify="center"><font color="green">Your Cohort has been Saved!! Please refresh your page!</font></div>):""}
        <Form onSubmit={handleSubmit}>
            <Explore ref={NewTableResults} />

                <FieldText name="cohortname" placeholder="Please enter cohort name...."  required autoResize />
                <Button>Save</Button>

            </Form>

        </>
     );
    };


  // A little bit of style here for heights and widths.
  const Explore  = styled.div`
      iframe {
      width: 100%;
      height: 100%;
    }
  `;

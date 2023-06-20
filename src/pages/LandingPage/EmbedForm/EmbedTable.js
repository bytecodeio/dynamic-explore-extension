import React, { useState, useCallback, useContext, useEffect } from "react";
import { Space, FieldText, Button, Form, Heading, SpaceVertical } from "@looker/components";
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { ExtensionContext } from "@looker/extension-sdk-react";
import styled from "styled-components";
import { connection, scratch_schema } from "../../../utils/writebackConfig";
import { values } from "lodash";
import QueryTwo from "./QueryTwo";

const EmbedTable = () => {
  const { extensionSDK, core40SDK: sdk } = useContext(ExtensionContext);
  const [visQid, setVisQid] = useState("");
  const [isVisLoading, setIsVisLoading] = useState(false);


  const [queryId, setQueryId] = useState();
  useEffect(() => {
    sdk.ok(sdk.dashboard("NunrrkoZQQWI5WUgZaNG33")).then((res) => {
      console.log("queryId", res.dashboard_elements[0].query.id);
      setQueryId(res.dashboard_elements[0].query.id);
      setVisQid(res.dashboard_elements[0].query.client_id)
    });
  }, []);

// rebecca_thompson_project::product_movement_details



  // useEffect(() => {
  //   const getQid = async () => {
  //     setIsVisLoading(true);
  //
  //     const queryBody = {
  //       model: "rebecca_thompson_project",
  //       view: "order_items",
  //       fields: [
  //         "users.customer_full_name",
  //              "inventory_items.product_category",
  //              "inventory_items.id",
  //              "inventory_items.product_department",
  //              "inventory_items.product_sku",
  //              "inventory_items.product_name",
  //              "inventory_items.product_brand",
  //              "order_items.sale_price",
  //              "order_items.created_at_month",
  //              "order_items.count_of_items",
  //              "order_items.total_sale_price"
  //       ],
  //
  //       total: false,
  //       client_id: queryId,
  //       // client_id: 350248,
  //     };
  //
  //     try {
  //       const response = await sdk.ok(sdk.create_query(queryBody));
  //       setVisQid(response.client_id);
  //       setIsVisLoading(false);
  //     } catch (e) {
  //       console.log("Error", e);
  //     }
  //   };
  //   queryId && getQid();
  // }, [queryId]);

  const embedCtrRef = useCallback(
    (el) => {
      const hostUrl = extensionSDK.lookerHostData.hostUrl;

      if (el && hostUrl && visQid) {
        console.log("visQid", visQid);
        el.innerHTML = "";
        LookerEmbedSDK.init(hostUrl);
        LookerEmbedSDK.createExploreWithUrl(
          `${hostUrl}/embed/query/rebecca_thompson_project/order_items?qid=${visQid}&sdk=2&embed_domain=${hostUrl}&sandboxed_host=true&_theme={"show_filters_bar":false}`
        )
          .appendTo(el)
          .on("drillmenu:click", (e) => {
            console.log(e);
          })
          .build()
          .connect()

          .catch((error) => {
            console.error("Connection error", error);
          });
      }
    },
    [visQid]
  );

  return <Explore ref={embedCtrRef} />;
};

const Explore = styled.div`
  width: 100%;
  min-height: 600px;
  & > iframe {
    width: 100%;
    height: 100%;
  }
`;

export default EmbedTable;

import React, { useState, useCallback, useContext, useEffect } from "react";
import { Space, FieldText, Button, Form, Heading, SpaceVertical } from "@looker/components";
import { Looker40SDK } from "@looker/sdk";
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { ExtensionContext } from "@looker/extension-sdk-react";
import styled from "styled-components";
import { connection, scratch_schema } from "../../../utils/writebackConfig";
import { values } from "lodash";
import { getVisQueryBody } from "./helpers/getVisQueryBody";

const QueryTwo = ({ queryId }) => {
  const { core40SDK: sdk } = useContext(ExtensionContext);
  const [fieldState, setFieldState] = useState([]);
  const [filterState, setFilterState] = useState([]);

  // const [queryId, updateQueryId] = useState();
  // useEffect( async () => {
  //
  //    sdk.ok(sdk.run_query({query_id: '350248', result_format: 'json'})).then((res) => {
  //
  //     // console.log("this is data", res);
  //     //
  //     // console.log(res[0])
  //
  //   });
  //
  // }, []);

  // const [dashboardData, setDashboardData] = useState([]);
  //
  // useEffect( async () => {
  //   const queryBody = ({
  //     model: 'rebecca_thompson_project',
  //     view: 'order_items',
  //     fields: [
  //       'users.customer_full_name',
  //       'inventory_items.product_category',
  //       'inventory_items.id',
  //       'inventory_items.product_department',
  //       'inventory_items.product_sku'
  //     ],
  //     total: false,
  //     client_id: 350248
  //
  //   })
  // let response = await  sdk.ok(sdk.dashboard('Y5mgkGp6GY2w9YcwK1bGP3')).then((res) => {
  //     Promise.all(
  //       res.dashboard_elements.map(
  //         (element) =>
  //           new Promise((resolve, reject) => {
  //               sdk.ok(sdk.create_query(queryBody))
  //               .then((res) => {
  //
  //                 console.log("ksdjbvksd", res)
  //
  //               })
  //               .catch((err) => {
  //                 console.log("err", err);
  //                 reject();
  //               });
  //           })
  //       )
  //     ).then((values) => {
  //       setDashboardData(values);
  //
  //     });
  //   });
  // }, []);



  // useEffect( async () => {
  //
  //
  // let fields = await sdk.ok(
  //   sdk.lookml_model_explore('rebecca_thompson_project', 'order_items', 'fields')
  // )
  //
  //         console.log("fields", fields)
  //         const dimensions = fields["fields"]["dimensions"];
  //         const measures = fields["fields"]["measures"];
  //
  //         let dims = filterOutValues(dimensions);
  //         let meas = filterOutValues(measures);
  //         let filters = dims.concat(meas);
  //         return {
  //           filters,
  //           measures: meas,
  //           dimensions: dims,
  //         };
  //
  //     console.log("dimensions", dims)
  //
  // }, []);

  useEffect(() => {
    async function fetchData() {

      let fieldsValue = await sdk.ok(
        sdk.lookml_model_explore('rebecca_thompson_project', 'order_items', 'fields')
      )



      console.log("dimensions", dimensions)
      console.log("measures", measures)


      let dims = filterOutValues(dimensions);
      let meas = filterOutValues(measures);
      let fields = dims.concat(meas);

      return {
        fields,
        measures: meas,
        dimensions: dims,
      };
    }

    fetchData();

  }, [sdk]);



  const filterOutValues = (values) => {
    const newObj = {};
    const filObj = {};

    values?.forEach((obj) => {
      if (Array.isArray(obj.tags) && obj.tags.length > 0) {
        obj.tags.forEach((str) => {
          if (str.startsWith('filter:')) {
            const filterValue = str.substring(7).trim();
            filObj.filter = filterValue;
            if (obj.label_short) {
              filObj.label_short = obj.label_short;
            }
          } else {
            const parts = str.split(':').map((item) => item.trim());
            if (parts.length === 2) {
              const key = parts.shift();
              const value = parts.join(':');
              newObj[key] = value;
            }
            if (obj.label_short) {
              newObj.label_short = obj.label_short;
            }
          }
        });
      }
    });
    return updatedObj(newObj, filObj);
  };

  const updatedObj = (obj1, obj2) => {
    const acc = { fieldsAcc: [], filterAcc: [] };

    if (obj1.measures || obj1.dimension) {
      let entryFields = { fields: obj1.measures || obj1.dimension };
      if (obj1.label_short) {
        entryFields.label_short = obj1.label_short;
      }
      acc.fieldsAcc.push(entryFields);
    }

    if (obj2.filter) {
      let entryFilter = { filter: obj2.filter };
      if (obj2.label_short) {
        entryFilter.label_short = obj2.label_short;
      }
      acc.filterAcc.push(entryFilter);
    }

    // console.log('acc.fieldsAcc', acc.fieldsAcc);
    // console.log('acc.filterAcc', acc.filterAcc);
    setFieldState(acc.fieldsAcc);
    setFilterState(acc.filterAcc);
  };



  // tags : "dimension: <name of dimension>"
  // tags : "measures: <name of measure>"
  // tags : "filter: <name of filter>"
  // label_short: "Created Day of Week Index"
  //this is what the object would look like below


  const fieldOptions = [
    {
      fields: "Purchase Amount",
      label_short: "Total Sale Price"

    },
    {
      fields: "Purchase Amount",
      label_short: "Total Sale Price"

    },
    {
      fields: "Purchase Amount",
      label_short: "Total Sale Price"

    },
  ];



  const filterOptions = [
    {
      filter: "Created Date",
      label_short: "Created Week of Year"
    },
  ];



  return (

    <div>

    </div>
  );
};

export default QueryTwo;

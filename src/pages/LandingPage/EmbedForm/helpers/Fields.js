import React, { useState, useCallback, useContext, useEffect } from "react";

import { Looker40SDK } from "@looker/sdk";
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { ExtensionContext } from "@looker/extension-sdk-react";
import styled from "styled-components";


import { Button, Form, FormCheck, FormControl, FormFloating, FormGroup, FormLabel, FormSelect, FormText, Image, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle} from 'react-bootstrap';


const Fields = ({ queryId }) => {
  const { core40SDK: sdk } = useContext(ExtensionContext);
  const [fieldState, setFieldState] = useState([]);
  const [filterState, setFilterState] = useState([]);

  const [message, setMessage] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);


   const filterOutValues = useCallback((values) => {
     setFieldState((prevFieldState) => {
       const fieldsAcc = [...prevFieldState]; // Copy existing fieldState

       values?.forEach((obj) => {
         if (Array.isArray(obj.tags) && obj.tags.length > 0) {
           obj.tags.forEach((str, index) => {
             if (str.startsWith("filter:")) {
               const filterValue = str.substring(7).trim();
               const filterObj = {
                 filter: filterValue,
                 label_short: obj.label_short,
                 index: index,
               };
               setFilterState((prevFilterState) => {
                 const filterAcc = [...prevFilterState]; // Copy existing filterState
                 filterAcc.push(filterObj);
                 // Sort the array by index
                 filterAcc.sort((a, b) => a.index - b.index);
                 return filterAcc;
               });
             } else {
               const parts = str.split(":").map((item) => item.trim());
               if (parts.length === 2) {
                 const key = parts.shift();
                 const value = parts.join(":");
                 const fieldsObj = {
                   fields: value,
                   label_short: obj.label_short,
                   index: index,
                 };
                 fieldsAcc.push(fieldsObj);
               }
             }
           });
         }
       });

       // Sort the array by index
       fieldsAcc.sort((a, b) => a.index - b.index);

       return fieldsAcc;
     });

     setFilterState((prevFilterState) => {
       const filterAcc = [...prevFilterState]; // Copy existing filterState
       // Sort the array by index
       filterAcc.sort((a, b) => a.index - b.index);
       return filterAcc;
     });
   }, []);

   useEffect(() => {
     async function fetchData() {
       let fieldsValue = await sdk.ok(sdk.lookml_model_explore('rebecca_thompson_project', 'order_items', 'fields'));

       const dimensions = fieldsValue["fields"]["dimensions"];
       const measures = fieldsValue["fields"]["measures"];

       filterOutValues(dimensions);
       filterOutValues(measures);
     }

     fetchData();
   }, []);



   const sortList = (records) => {
    return records.sort((a,b) => {
       var x = a;
       var y = b;
           return x < y ? -1 : x > y ? 1 : 0;
       });
   }

  return (

    <div>



    <p className="showModal" onClick={handleShow}>Select Fields <i class="fal fa-th-list"></i></p>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title><h4>Fields</h4></Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div class="col-12 col-xs-12">

                <div class="wrapFields">

                  {fieldState.map((fieldOption) => (

                    <div className="one">


                    <Form.Group>
                      <Form.Check
                        type="checkbox"

                        className=""
                        label={fieldOption.label_short}
                        // checked={gender === "F"}
                        name="Fields"
                        // checked={selectedFilters.Gender.includes(genderOption.value)}
                        value={fieldOption.fields}
                        // onClick={() => updateFilter("Gender", genderOption.value)}
                      />
                    </Form.Group>
                      </div>

                  ))}




                  </div>


    </div>


      </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" className="diagonal" onClick={handleClose}>
                Close
              </Button>

            </Modal.Footer>
          </Modal>








    </div>
  );
};

export default Fields;

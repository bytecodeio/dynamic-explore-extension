import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const key = 'account group'

const AccountGroups = ({
  fieldOptions,
  selectedFilters
}) => {
  // function handleFieldSelection(value) {
  //   setSelectedAccountGroup((prev) => {
  //     if (prev.includes(value)) {
  //       return prev.filter((selectedFilter) => selectedFilter !== value);
  //     } else {
  //       return [...prev, value];
  //     }
  //   });
  // }
  useEffect(() => {
    console.log("field options", fieldOptions)
  },[fieldOptions])




  return (
    <div className="wrapFilters">
      {fieldOptions?.options.values.map((fieldOption) => (
        <div className="one" key={Object.values(fieldOption)}>
          <Form.Group>
            <Form.Check
              type="checkbox"
              className=""
              label={Object.values(fieldOption)}
              checked={false}
              name="accountGroups"
              // id={fieldOption}
              value={Object.values(fieldOption)}
              onChange={() => handleFieldSelection(fieldOption)}
            />
          </Form.Group>
        </div>
      ))}
    </div>

    // set value to name
  );
};

export default AccountGroups;

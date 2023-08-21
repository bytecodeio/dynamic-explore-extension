import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const AccountGroups = ({
  fieldOptions,
  setSelectedAccountGroup,
  selectedAccountGroup,
  showMenu2,
  setShowMenu2
}) => {
  function handleFieldSelection(value) {
    setSelectedAccountGroup((prev) => {
      if (prev.includes(value)) {
        return prev.filter((selectedFilter) => selectedFilter !== value);
      } else {
        return [...prev, value];
      }
    });
  }




  return (

    <div  className={showMenu2 ? "wrapFilters fullScreen" : "wrapFilters"}>
      <i class="fal fa-times closeOptions" onClick={() => setShowMenu2(false)} ></i>


      {fieldOptions.map((fieldOption) => (
        <div className="one" key={fieldOption}>
          <Form.Group>
            <Form.Check
              type="checkbox"
              className=""
              label={fieldOption}
              checked={selectedAccountGroup.includes(
                fieldOption
              )}
              name="accountGroups"
              // id={fieldOption}
              value={fieldOption}
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

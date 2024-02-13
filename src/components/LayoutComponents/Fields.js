import { OpenInNew } from "@styled-icons/material-outlined";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button, ButtonGroup, Form, Modal } from "react-bootstrap";

const Fields = ({
  fieldOptions,
  setTabList,
  tabList,
  currentInnerTab,
  updateBtn,
  setUpdateBtn,
  showActionBtns = true

}) => {
  const [expandMenu, setExpandMenu] = useState(false);

  useEffect(() => {
    console.log("fields options", fieldOptions)
  },[fieldOptions])

  function handleFieldSelection(fieldName) {
    console.log(fieldName)    
    // setUpdateBtn(false);
    let tabs = [...tabList];
    let currentTab = tabs[currentInnerTab];
    if (currentTab["selected_fields"].includes(fieldName)) {
      let index = currentTab["selected_fields"].indexOf(fieldName);
      currentTab["selected_fields"].splice(index, 1);
    } else {
      currentTab["selected_fields"].push(fieldName);
    }
    setTabList(tabs);
  }

  const handleFieldsAll = () => {
    let tabs = [...tabList];
    let currentTab = tabs[currentInnerTab];
    currentTab['selected_fields'] = fieldOptions.map(fo => {return fo['name']})
    setTabList(tabs)
  }

  const handleRestoreDefault = () => {
    let tabs = [...tabList];
    let currentTab = tabs[currentInnerTab];
    currentTab['selected_fields'] = [...currentTab['default_fields']]
    setTabList(tabs)
  }

  const handleMenuExpand = () => {
    setExpandMenu(true)
  }

  const sortData= (data) => {
    if (data) {
      return data.sort((a,b) => {
       var x = a.label_short.toLowerCase();
       var y = b.label_short.toLowerCase();
           return x < y ? -1 : x > y ? 1 : 0;
       });
    }
    return null
   }


  return (
    <>
    {showActionBtns?
      <div className="mb-2" style={{display:'flex', justifyContent:'space-between'}}>
          <>
            <a className="allOptions clear first" onClick={handleFieldsAll}>Select All</a>

            <a className="allOptions clear restore" onClick={handleRestoreDefault}>Restore Defaults</a>

            <a className="allOptions clear filter-expand" onClick={() => handleMenuExpand()}><OpenInNew /></a>
          </>
      </div>
      :''
    }
    <div  className={expandMenu ? "wrapFilters fullScreen" : "wrapFilters"}>
      <i class="fal fa-times closeOptions" onClick={() => setExpandMenu(false)} ></i>
      <ButtonGroup>
        {sortData(fieldOptions)?.map((fieldOption) => (
          
            <Button active={tabList.length > 0?tabList[currentInnerTab]["selected_fields"].includes(
                  fieldOption.name):false}
              onClick={() => handleFieldSelection(fieldOption.name)}
              value={fieldOption.label_short}
              >
                {fieldOption.label_short}
            </Button>
          // <div className="one" key={fieldOption.name}>
          //   <Form.Group>
          //     <Form.Check
          //       type="checkbox"
          //       className=""
          //       label={fieldOption.label_short}
          //       checked={tabList.length > 0?tabList[currentInnerTab]["selected_fields"].includes(
          //         fieldOption.name
          //       ):false}
          //       name="Fields"
          //       // id={fieldOption.name}
          //       value={fieldOption.fields}
          //       onChange={() => handleFieldSelection(fieldOption.name)}
          //     />
          //   </Form.Group>
          // </div>
        ))}      
      </ButtonGroup>
    </div>
  </>
    // set value to name
  );
};

export default Fields;

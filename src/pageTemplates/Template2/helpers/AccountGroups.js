import { indexOf } from "lodash";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const account_key = 'account group'

const AccountGroups = ({
  fieldOptions,
  selectedFilters,
  setSelectedFilters
}) => {
  const [expandMenu, setExpandMenu] = useState(false)
  const [keyword, setKeyword] = useState("")
  function handleFieldSelection(key,value) {
    console.log(value)
    let filters = {...selectedFilters}
    if (filters[account_key][key]) {
      let values = filters[account_key][key]
      if (values.includes(value)){
        let index = values.indexOf(value);
        console.log(index)
        console.log(values.splice(index,1))
        let newValues = [...values.splice(index,1)];
        console.log(newValues)
        filters[account_key][key] = newValues
      }
    } else {
      filters[account_key][key] = [value]
    }

    console.log(filters)
    // let keyVal = Object.keys(value)[0]
    // let selectFilters = {...selectedFilters}
    // let filters = []
    // if (selectFilters[key][keyVal].includes(Object.values(value))) {
    //   filters = selectFilters[key].filter((selectedFilter) => selectedFilter !== value);
    // } else {
    //   filters.push(value)
    // }
    // selectFilters[key][keyVal] = filters
    // // });
    // setSelectedFilters(selectFilters)
  }

  const handleFieldsAll = () => {
    let filters = [...selectedFilters];
    currentTab['selected_fields'] = fieldOptions.map(fo => {return fo['name']})
    setSelectedFilters(filters)
  }

  const clearAllAccounts = () => {
    let filters = [...selectedFilters];
    filters[account_key] = []
    setSelectedFilters(filters)
  }

  const handleMenuExpand = () => {
    setExpandMenu(true)
  }

  const handleChangeKeyword = () => {

  }


  return (
    <>
      <span className="allOptions clear first" onClick={handleFieldsAll}>Select All</span>

      <span className="allOptions clear second" onClick={clearAllAccounts}>Clear All</span>

      <span className="allOptions clear"  onClick={() => handleMenuExpand()}>Expand</span>
      <div className="mb-5"></div>
      <div className="position-relative mb-2">
        <input value={keyword} onChange={handleChangeKeyword} placeholder="Search" type="search" class="form-control" />
        <i class="far fa-search absoluteSearch"></i>
      </div>
      <div  className={expandMenu ? "wrapFilters fullScreen" : "wrapFilters"}>
        <i class="fal fa-times closeOptions" onClick={() => setExpandMenu(false)} ></i>
        {fieldOptions?.options.values?
          fieldOptions.options.values.map((fieldOption) => {
            let [key,value] = Object.entries(fieldOption)[0];
            return (
            <div className="one" key={value}>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  className=""
                  label={value}
                  checked={false}
                  name="accountGroups"
                  // id={fieldOption}
                  value={value}
                  onChange={() => handleFieldSelection(key,value)}
                />
              </Form.Group>
            </div>
            )
        }):''}
      </div>
    </>

    // set value to name
  );
};

export default AccountGroups;

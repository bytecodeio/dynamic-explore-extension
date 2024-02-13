import React from 'react'
import { Col, Form } from 'react-bootstrap'
import { sortDateFilterList } from '../../../../utils/globalFunctions';

export const DateFilterSelector = ({dateFilter,selectedFilters, updateDateRange, type, setSelectedFilters, dateRange}) => {
    
    const handleSelection = async (e) => {
        let filters = {...selectedFilters}
        filters[type] = {}
        filters[type][e.target.id] = 'Yes'
        setSelectedFilters(filters);
        await updateDateRange(dateRange, dateFilter, filters)
      };

    return(
          <div className="grid2">
            {dateFilter?.options?
            sortDateFilterList(dateFilter?.options)?.map(filter => {
              return (
                <div className="one radio">
                  <Form.Group
                    controlId={filter['name']}>
                    <Form.Check
                      checked={Object.keys(selectedFilters[type]).find(key => key === filter['name'])? true:false}
                      id={filter['name']}
                      value={filter['name']}
                      type="radio"
                      // name="dateFilters"
                      onChange={handleSelection}
                      label={filter['label_short'].replace('(Yes / No)', '')}
                    />
                  </Form.Group>
                </div>
              )
            }):''}
          </div>
    )
}
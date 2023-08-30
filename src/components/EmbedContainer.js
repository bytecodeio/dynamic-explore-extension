import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import EmbedTable from "./EmbedTable";

export const EmbedContainer = ({vis, visList, updateVisList, handleVisUpdate}) => {
    useEffect(() => {
        console.log("vis obj", vis)
    },[visList])

    const handleToggle = (el, o) => {
        let _visList = [...visList];
        let currentVis = _visList.find(({index}) => index === vis.index);
        currentVis['localSelectedFilters'][o] = el.target.value;
        updateVisList(_visList)
        handleVisUpdate(currentVis.index);
    }
    return(
        <>
        <div className="tile-filter-container">
            {vis['tileFilterOptions'].length > 0?
                vis['tileFilterOptions'].map(o => {
                    return (
                        <Form.Select onChange={(el) => handleToggle(el,o['name'])} value={vis['localSelectedFilters'][o['name']]} style={{width:'25%'}}>
                            {o.options.map(v => {
                                return (
                                <option key={v.value} value={v.value}> {v.label}</option> 
                                )                            
                            })}
                        </Form.Select>
                    )
                })
                :''
            }
        </div>
        <EmbedTable queryId={vis.query} />
        </>
    )    
}
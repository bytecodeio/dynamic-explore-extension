import React, { Fragment, useState, useEffect } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import EmbedTable from "./EmbedTable";

export const EmbedContainer = ({vis, visList, updateVisList, handleVisUpdate}) => {
    const [openPopover, setOpenPopover] = useState(false)
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

    const handlePopover = () => {
        setOpenPopover(!openPopover)
    }
    return(
        <>
        <Row>
        <Col md={12} lg={5}>
            {vis['tileFilterOptions'].length > 0?
                vis['tileFilterOptions'].map(o => {
                    return (
                        // <>
                        //     <div className="selector-container">                                    
                        //         <Button onClick={handlePopover}><i class="far fa-redo"></i></Button>
                        //         <div>{vis['localSelectedFilters'][o['name']]}</div>
                        //     </div>
                        //     {openPopover?
                        //         <div className="popover-container">
                        //             <ul>
                        //                 {o.options.map(v => {
                        //                     return (
                        //                         <Button className="selector-button" onClick={() => handleToggle(v.value, o['name'])} value={v.value}>{v.label}</Button>
                        //                     )
                        //                 })}
                        //             </ul>
                        //         </div>
                        //         :''
                        //     }
                        // </>
                        <Form.Select onChange={(el) => handleToggle(el,o['name'])} value={vis['localSelectedFilters'][o['name']]}>
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
            </Col>
        </Row>
        <EmbedTable queryId={vis.query} />
        </>
    )
}

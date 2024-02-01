import { ExtensionContext } from "@looker/extension-sdk-react";
import React, { useContext, useEffect, useRef } from "react"
import { useState } from "react";
import { Button, Form, Overlay, OverlayTrigger, Popover, Tooltip, Spinner, Modal } from "react-bootstrap"
import { LoadingComponent } from "./LoadingComponent";

export const SavedFilters = ({savedFilters, handleVisUpdate, setSelectedFilters, removeSavedFilter, upsertSavedFilter}) => {
    const extensionContext = useContext(ExtensionContext)
    const sdk = extensionContext.core40SDK;

    const target = useRef(null);
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState("")
    const [user, setUser] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [filterToDelete, setFilterToDelete] = useState()
    const [savedFiltersObj, setSavedFiltersObj] = useState([])

    useEffect(() => {
        const init = async() => {
          let _user = await sdk.me();
          console.log("user",_user)
          setUser(_user.value)
        }
        init();
    },[])

    useEffect(() => {
        console.log("saved filters", savedFilters)
        setSavedFiltersObj([...savedFilters])
    },[savedFilters])

    const handleSavedFilterClick = async (filter) => {
        setSelectedFilters(filter['filter_string'])
        handleVisUpdate({}, filter['filter_string'])
    }

    const openModal = (id) => {
        setShowModal(true)
        setFilterToDelete(id)
    }

    const handleSavedFilterRemoval = async () => {   
        setIsLoading(true)
        //setShowModal(true)     
        await removeSavedFilter(filterToDelete)
        setIsLoading(false)
        setShowModal(false)
    }

    const handleNewSavedFilterPopover = () => {        
        setOpen(!open)
    }
    const handleUpdateSavedFilter = (filter) => {        
        setSelectedFilter(filter)
        setOpenEdit(!openEdit)
    }

    return (
        <>
        <div style={{paddingBottom:'30px'}}><span className="allOptions saved-filter-button" ref={target} onClick={handleNewSavedFilterPopover} ><i class="fal fa-plus"></i>   Add</span></div>
        <Overlay target={target.current} show={open} placement="right">
            <div>
                <NewSavedFilterPanel setOpen={setOpen} upsertSavedFilter={upsertSavedFilter} setIsLoading={setIsLoading} savedFiltersObj={savedFiltersObj}/>
            </div>
        </Overlay>
        {isLoading?
           <LoadingComponent sz={'sm'} />:
           <>
            {savedFiltersObj?.map(s => {
                    return (
                    <div >
                            <p className="pb-1 saved-filter-item">
                                <div onClick={() => handleSavedFilterClick(s)}>
                                   {s.title} 
                                </div>                                
                                <div className="saved-filter-action">
                                    {s.global == "true"?
                                    <>
                                        <OverlayTrigger
                                            placement="right"
                                            overlay={
                                                <Tooltip>
                                                    This is a global saved filter
                                                </Tooltip>
                                            }
                                            className="tooltipHover"
                                        >
                                        <i className="fal fa-info-circle"></i>
                                        </OverlayTrigger>
                                    </>
                                    :''}
                                    {user.id == s.user_id?
                                    <>
                                        <i onClick={() => handleUpdateSavedFilter(s)}className="far fa-edit"></i>
                                        <i onClick={() => openModal(s.id)} className="fas fa-trash red"></i>
                                    </>
                                    :''}
                                </div>
                            </p>

                    </div>
                    )
                    })}
                    <Overlay target={target.current} show={openEdit} placement="right">
                        <div>
                            <UpdateSavedFilterPanel openEdit={openEdit} setOpenEdit={setOpenEdit} upsertSavedFilter={upsertSavedFilter} selectedFilter={selectedFilter} setIsLoading={setIsLoading}/>
                        </div>
                    </Overlay>
                    </>
                    }
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>Are you sure you want to delete this saved filter?</Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => handleSavedFilterRemoval()}>Delete</Button>
                    <Button onClick={() => setShowModal(false)}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const NewSavedFilterPanel = React.forwardRef(({setOpen, upsertSavedFilter,setIsLoading, savedFiltersObj}) => {
    const [title, setTitle] = useState("");
    const [checkbox, setCheckbox] = useState(false)

    const handleUpdateTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleUpdateCheckbox = (e) => {
        setCheckbox(e.target.checked)
    }

    const handleCancelClick = () => {
        setTitle("")
        setCheckbox(false);
        setOpen(false)
    }

    const handleSaveClick = async () => {
        setIsLoading(true)        
        await upsertSavedFilter('insert', {'title':title, 'global':checkbox})
        setTitle("")
        setCheckbox(false);
        setIsLoading(false)
    }

    return (
        <Popover className="test">
            <Popover.Header><p>Add Saved Filter</p></Popover.Header>
            <Popover.Body>
                <div className="saved-filter-body">
                    <Form.Label htmlFor="saved-filter-title">Title</Form.Label>
                    <Form.Control onChange={handleUpdateTitle} value={title} id='saved-filter-title'/>

                    <div className="saved-filter-control">
                      <div className="one">
                        <Form.Group>
                        <Form.Check
                        name="saved"
                        onClick={handleUpdateCheckbox}
                        checked={checkbox}
                        type="checkbox"
                        id='saved-filter-check'
                        label="Save as Global Filter"
                        />
                        </Form.Group>
                      </div>
                    </div>


                    <Form.Text className="mt-2 mb-2">*Note: This saved filter will be saving the current filter selection</Form.Text>

                    <div className="saved-filter-action-bar">
                        <Button onClick={handleSaveClick}>Save</Button>
                        <Button className="btn-clear" onClick={handleCancelClick}>Cancel</Button>
                    </div>
                </div>

            </Popover.Body>
        </Popover>
    )
})

const UpdateSavedFilterPanel = React.forwardRef(({setOpenEdit, openEdit, upsertSavedFilter,selectedFilter,setIsLoading}) => {
    const [title, setTitle] = useState("");
    const [checkbox, setCheckbox] = useState(false)
    const [id, setId] = useState("")

    useEffect(() => {
         console.log("saved", selectedFilter)
         const {global, id, title} = selectedFilter
         setTitle(title)
         let _checkbox = global == "true"?true:false;
         setCheckbox(_checkbox)
         setId(id)
    },[openEdit])

    const handleUpdateTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleUpdateCheckbox = (e) => {
        setCheckbox(!e)
    }

    const handleCancelClick = () => {
        setTitle("")
        setCheckbox(false);
        setId("")
        setOpenEdit(false)
    }

    const handleSaveClick = async () => {
        setIsLoading(true)
        setTitle("")
        setCheckbox(false);
        setId("")
        setOpenEdit(false)
        await upsertSavedFilter('update', {'id':id, 'title':title, 'global':checkbox})
        setIsLoading(false)
    }

    return (
        <Popover className="test">
            <Popover.Header>Update Saved Filter</Popover.Header>
            <Popover.Body>
                <div className="saved-filter-body">
                    <Form.Label htmlFor="saved-filter-title">Title</Form.Label>
                    <Form.Control onChange={handleUpdateTitle} value={title} id='saved-filter-title'/>

                    <div className="saved-filter-control">

                    <div className="one">
                      <Form.Group>
                      <Form.Check
                      name="saved"
                      onChange={() => handleUpdateCheckbox(checkbox)}
                      checked={checkbox}
                      type="checkbox"
                      id='saved-filter-check'
                      label="Save as Global Filter"
                      />
                      </Form.Group>
                    </div>

        
                    </div>

                    <div>

                    </div>
                    <Form.Text>
                        <div className="saved-filter-update-tooltip">
                            {selectedFilter.tooltip?.map(t => (
                                <p>{t}</p>
                            ))}
                        </div>
                    </Form.Text>

                    <div className="saved-filter-action-bar">
                        <Button onClick={handleSaveClick}>Update</Button>
                        <Button className="btn-clear" onClick={handleCancelClick}>Cancel</Button>
                    </div>
                </div>

            </Popover.Body>
        </Popover>
    )
})

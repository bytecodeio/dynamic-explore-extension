import React, {Fragment, useEffect, useState} from 'react'
import { getLandingPageApplications } from '../../utils/writebackService'
import { useContext } from 'react'
import { ExtensionContext } from '@looker/extension-sdk-react'
import { ButtonGroup, Button, InputGroup, Form, Container, Tooltip, OverlayTrigger, Row, Col } from 'react-bootstrap';
import ToTopButton from "../../components/ToTopButton.js";

export const LandingPage = ( {description} ) => {
    const extensionContext = useContext(ExtensionContext)
    const sdk = extensionContext.core40SDK;
    const { hostUrl } = extensionContext.extensionSDK.lookerHostData;

    const [apps, setApps] = useState([])
    const [allApps, setAllApps] = useState([])
    const [selectedButton, setSelectedButton] = useState("grid")
    const [searchTerm, setSearchTerm] = useState("")


    useEffect(() => {
        const initialize = async () => {
            let _apps = await getLandingPageApplications(sdk)
            setApps(_apps)
            setAllApps(_apps)
        }
        initialize();
    },[])

    const handleClick = (app) => {
        let url = `${hostUrl}/embed/extensions/${app.model}::${app.route}`
        console.log(url)
        extensionContext.extensionSDK.openBrowserWindow(url)
    }

    const handleButtonGroupClick = (v) => {
        setSelectedButton(v)
    }

    const handleSearchTerm =(e) => {
        setSearchTerm(e.target.value)
    }

    const handleSearchButton = () => {
        const data = [...allApps];
        let _apps = searchTerm.replace(" ") != ""? data.filter(d => d.name.toUpperCase().includes(searchTerm.toUpperCase())):data;
        setApps(_apps)
    }

console.log(apps, "elizabeth")






    return(
        <Fragment>
          <Container fluid>
          <Row>

        <div className='landing-page-action'>
          <Col md={1}>
          <div className="d-flex justify-content-start align-items-baseline">
          <p className="small mr-1">view</p>


            <ButtonGroup size="sm" className='landing-page-button-group'>
                <Button onClick={() => handleButtonGroupClick("grid")} active={selectedButton == "grid"} value={"grid"}>
                    <i className="far fa-th"></i>
                </Button>
                <Button onClick={() => handleButtonGroupClick("list")} active={selectedButton == "list"} value={"list"}>
                    <i className='far fa-bars'></i>
                </Button>

            </ButtonGroup>

            </div>
            <div className="d-flex justify-content-start align-items-baseline mt-3">
            <p className="small mr-1">sort</p>
            <ButtonGroup size="sm" className='landing-page-button-group'>
                <Button className="active">
                    <i className="fal fa-sort-alpha-up"></i>
                </Button>
                <Button>
                    <i className='fal fa-analytics'></i>
                </Button>
            </ButtonGroup>
            </div>
              </Col>
            <Col md={10}>
            <InputGroup className='landing-page-search'>
                <Form.Control id='search' placeholder='Search' onChange={handleSearchTerm} onKeyDown={(e) => e.keyCode == "13"? handleSearchButton():''}>
                </Form.Control>
                <Button onClick={handleSearchButton}>Go</Button>
            </InputGroup>
            </Col>

        </div>

        </Row>
        </Container>
        <Container>
          <Row>
        <div className='landing-page-container'>
            {apps?.map(a =>
            selectedButton == "grid"?
            <OverlayTrigger
              placement="right"
              overlay=<Tooltip id="squares"><p style={{fontSize:"12px"}}>{a.tooltip_description}</p></Tooltip>
              className="tooltipHover"
            >
                <a className='landing-page-content' href={`#`} onClick={() => handleClick(a)}>
                    <div className='landing-page-item'>
                        {a.thumbnail_base64 != null?
                        <img className='looker-thumbnail' src={a.thumbnail_base64} onError={(e) => {e.target.onError=null; e.target.src="/"}} />
                        :<div className='looker-thumbnail not-available'>Preview Not Available</div>
                        }
                        <div className='landing-page-item-detail'>{a.name}</div>
                    </div>
                </a>
              </OverlayTrigger>
                :
                <a href={`#`} className={`landing-page-row ${apps.indexOf(a) % 2? 'even':'odd'}`} onClick={() => handleClick(a)}>
                    <div>
                        <h6>{a.name}</h6>
                    </div>
                </a>
            )}
        </div>
        </Row>
        </Container>
       <ToTopButton />
      </Fragment>
    )
}

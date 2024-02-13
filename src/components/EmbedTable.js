import React, { useCallback, useContext, useState, useEffect } from "react";
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { ExtensionContext } from "@looker/extension-sdk-react";
import styled from "styled-components";
import { Spinner } from "react-bootstrap";
import { waveform } from "ldrs";

import { ApplicationContext } from "../Main";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { LoadingComponent } from "./LoadingComponent";
import { TabContext } from "./ReportContainer";

waveform.register()

const Explore = styled.div`
  width: 100%;
  min-height: unset;
  height:100%;
  margin-top: -30px;
  & > iframe {
    width: 100%;
    height: 100%;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmbedTable = ({ queryId, vis }) => {
  const { application } = useContext(ApplicationContext)
  const { extensionSDK, core40SDK:sdk } = useContext(ExtensionContext);
  
  const {isLoading,setIsLoading} = useContext(TabContext)
  
  const dev = false

  const [isLoadingViz, setIsLoadingViz] = useState(false)
  const [message, setMessage] = useState({status:'ok'})

  // useEffect(() => {
  //   console.log("isLoading",isLoading)
  //   setIsLoadingViz(true);
  //   //setIsLoading({[vis.title]:false})
  // },[isLoading[vis.title]==true])
  useEffect(() => {
    setMessage({status:'ok'})
    console.log("isLoading",vis.isLoading + ' ' + vis.title)    
    setIsLoadingViz(true);
  },[vis.isLoading == true])

  useEffect(() => {
    const checkQuery = async () => {
      let _message = {...message}
      _message['status'] = 'ok'
      setMessage(_message)
      console.log("query id embed",vis.query_id)
      if (vis.query_id !== "" && vis.query_id !== undefined) {
        let results = await sdk.run_query({query_id:vis['query_id'], result_format:'json'})
        if (results.value.length == 0) {
          setMessage({status:'no results'})
          return;
        }
        if (results.value[0]['looker_error']) {
          setMessage({status:'error'})
          return;
        }
        if (results.value.length > 0) {
          setMessage({status:'ok'})
          return;
        }
      }
    }
    checkQuery();    
  },[vis.query_id])

  const handleRunComplete =(e) => {
    console.log("event",e)
    setIsLoadingViz(false)
  }

  // const embedCtrRef = useCallback(
  //   (el) => {
  //     const hostUrl = extensionSDK.lookerHostData.hostUrl;

  //     if (el && hostUrl && queryId) {
  //       el.innerHTML = "";
  //       LookerEmbedSDK.init(hostUrl);
  //       LookerEmbedSDK.createExploreWithUrl(
  //           `${hostUrl}/embed/query/${application.model}/${application.explore}?qid=${queryId}&sdk=2&embed_domain=${dev?'http://localhost:8080':hostUrl}&sandboxed_host=true`
  //         )
  //         .appendTo(el) 
  //         //.on('explore:run:start', (e) => handleRunComplete(e)) 
  //         .on('explore:run:complete', (e) => handleRunComplete(e)) 
  //         //.on('explore:ready', (e) => handleRunComplete(e)) 
  //         //.on('explore:state:changed', (e) => handleRunComplete(e))              
  //         .build()
  //         .connect()        
  //         .catch((error) => {
  //           console.error("Connection error", error);
  //         });
  //     }
  //   },
  //   [queryId]
  // );


  const embedCtrRef = useCallback(
    (el) => {
      const hostUrl = extensionSDK.lookerHostData.hostUrl;
      console.log("visualization", vis)
      if (el && hostUrl && queryId) {
        el.innerHTML = "";
        LookerEmbedSDK.init(hostUrl);
        LookerEmbedSDK.createExploreWithUrl(
            `${hostUrl}/embed/query/${application.model}/${application.explore}?${vis.visUrl}&sdk=2&embed_domain=${dev?'http://localhost:8080':hostUrl}&sandboxed_host=true`
          )
          .appendTo(el) 
          //.on('explore:run:start', (e) => handleRunComplete(e)) 
          .on('explore:run:complete', (e) => handleRunComplete(e)) 
          //.on('explore:ready', (e) => handleRunComplete(e)) 
          //.on('explore:state:changed', (e) => handleRunComplete(e))              
          .build()
          .connect()        
          .catch((error) => {
            console.error("Connection error", error);
          });
      }
    },
    [vis.visUrl]
  );

  return (
    <>
      {message.status == "no results"?
        <div style={{position:'absolute', height:'100%', width:'100%', backgroundColor:'white'}}>No results returned</div>
      :''}
      {message.status == "error"?
        <div style={{position:'absolute', height:'100%', width:'100%', backgroundColor:'white'}}>Error</div>
      :''}
      {isLoadingViz?
        <LoadingComponent />
        :
      ''}
      {queryId ? <Explore ref={embedCtrRef}/>: <Spinner />}
    </>
  );
};

export default EmbedTable;

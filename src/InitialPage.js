import { ExtensionContext } from '@looker/extension-sdk-react';
import React from 'react';
import { useContext } from 'react';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { Main } from './Main';

export const InitialPage = () => {
    const extensionContext = useContext(ExtensionContext)
    const {extensionId} = extensionContext.extensionSDK.lookerHostData

    return (
        <>
            {/*Decide whether to send to Landing Page or main App content*/}
            {extensionId.includes('landing-page')?
            <LandingPage />
            :
            <Main />
            }
        </>
    )
}
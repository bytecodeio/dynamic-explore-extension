import React, { useState, useCallback } from "react";
import { EmbedForm } from "./EmbedForm/EmbedForm";

export const LandingPage = () => {
    const [saveClicked, setSaveClicked] = useState(false)
    return (
    <EmbedForm saveClicked={saveClicked} setSaveClicked={setSaveClicked} />

    );
  };

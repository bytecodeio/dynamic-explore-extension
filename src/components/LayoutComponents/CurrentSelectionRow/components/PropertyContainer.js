import React from 'react'

export const PropertyContainer = ({properties}) => {
    return(
        <>
            {properties?.find(({ group }) => group === "property") ? (
                <p>
                    <b>
                        {
                        properties?.find(({ group }) => group === "property")
                            ?.text
                        }
                    </b>{" "}
                    <span className="highlight large">
                        {Object.values(
                        properties?.find(({ group }) => group === "property")
                            ?.value
                        )}
                    </span>
                </p>
            ) : (
                ""
            )}
        </>
    )
}
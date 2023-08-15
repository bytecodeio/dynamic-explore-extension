import React, { Fragment, useState, useEffect } from "react";
import { Button, Form, Modal, Spinner, Row, Col, Tooltip, Container, OverlayTrigger} from "react-bootstrap";
import * as $ from "jquery";

const CurrentAccountGroup = ({
  selectedDateFilter,
  selectedFilters,
  filterOptions,
  fieldOptions,
  selectedFields,
  setSelectedFields,
  dateFilterOptions,
  setSelectedAccountGroup,
  selectedAccountGroup

}) => {
  const [currentSelection, setCurrentSelection] = useState([]);

  useEffect(() => {
    let currentSelectionObj = {};

    for (const filter in selectedAccountGroup) {
      if (selectedAccountGroup[filter] !== "") {
        const option1 = fieldOptions.find(
          (option1) => option1.name ===  selectedAccountGroup[filter]
        );

        if (option1) {
          currentSelectionObj[filter] = option1;
        }
      }
    }

    setCurrentSelection(currentSelectionObj);
  }, [

    fieldOptions,
    setSelectedAccountGroup,
    selectedAccountGroup
  ]);

  function removeAccount(fieldName) {
    setSelectedAccountGroup((prev) => {
      if (prev.includes(fieldName)) {
        return prev.filter((selectedFilter) => selectedFilter !== fieldName);
      } else {
        return [...prev, fieldName];
      }
    });

  }


  const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    These are pending filters you have selected. Please use the "Submit Filters" button to update the table.
  </Tooltip>
  );


const num = $('.tab-pane.active.show .currentFiltersAdded .theOptions').length

$('.numberCounter').html($('.tab-pane.active.show .currentFiltersAdded .theOptions').length)

// if (num > 3  ){
//   $('.whiteBar').fadeIn()
//  $('.currentFiltersAdded').addClass('minHeight')
//
// }
// if (num < 4  ){
//   $('.whiteBar').fadeOut()
//  $('.currentFiltersAdded').removeClass('minHeight')
// }
//
// if (num > 0 ){
// $('.currentFiltersAdded').addClass('newHeight')
// $('.pHidden').removeClass('hidden')
// }
// else{
//   $('.currentFiltersAdded').removeClass('newHeight')
//  $('.pHidden').addClass('hidden')
// }
//
// $('.currentFiltersAdded').on('mouseenter', function(e) {
//   if($('.whiteBar').css('display') == 'block') {
//     e.stopPropagation()
//
//     $('.whiteBar').hide()
//     $('.currentFiltersAdded').animate({
//         minHeight: "none",
//         maxHeight:"100%",
//         height:"auto"
//
//     },400);
//   }
//
// })
//
//
// $('.leaveIt').on('mouseleave', function(e) {
//   if($('.whiteBar').css('display') == 'none' && $('.tab-pane.active.show .currentFiltersAdded .theOptions').length > 3 ) {
//
//      e.stopPropagation()
//       $('.whiteBar').show()
//     $('.currentFiltersAdded').animate({
//           minHeight: "none",
//           maxHeight:"100px",
//           height:"auto"
//     },400);
//   }
// })





  return (



      <Fragment>

    {/*<div className="currentFiltersAdded">

      <div className="whiteBar">
        <i class="fas fa-circle">
          <h6 className="numberCounter"></h6>
        </i>
        <p class="text-center mostSmall">hover to see all</p>
      </div>*/}

        {Object.keys(selectedAccountGroup)?.map((selection) => {
          return (

            <OverlayTrigger
            placement="right"
            overlay={renderTooltip}
            className="tooltipHover"
            >
            <div className="theOptions" key={selection}>
              <p className="mb-0 blue">{selectedAccountGroup[selection]}</p>
              <i
                onClick={() => removeAccount(selectedAccountGroup[selection])}
                className="fal fal fa-times blue"
              ></i>
            </div>
            </OverlayTrigger>
          );
        })}

      </Fragment>
  );
};

export default CurrentAccountGroup;

import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Spinner, Row, Col } from "react-bootstrap";
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


const num = $('.tab-pane.active.show .currentFiltersAdded .theOptions').length

$('.numberCounter').html($('.tab-pane.active.show .currentFiltersAdded .theOptions').length)

if (num > 3  ){
  $('.whiteBar').fadeIn()
 $('.currentFiltersAdded').addClass('minHeight')

}
if (num < 4  ){
  $('.whiteBar').fadeOut()
 $('.currentFiltersAdded').removeClass('minHeight')
}

if (num > 0 ){
$('.currentFiltersAdded').addClass('newHeight')
$('.pHidden').removeClass('hidden')
}
else{
  $('.currentFiltersAdded').removeClass('newHeight')
 $('.pHidden').addClass('hidden')
}

$('.currentFiltersAdded').on('mouseenter', function(e) {
  if($('.whiteBar').css('display') == 'block') {
    e.stopPropagation()

    $('.whiteBar').hide()
    $('.currentFiltersAdded').animate({
        minHeight: "none",
        maxHeight:"100%",
        height:"auto"

    },400);
  }

})

$('.currentFiltersAdded .theOptions').click(function(e){
  if($('.whiteBar').css('display') == 'none' && $('.tab-pane.active.show .currentFiltersAdded .theOptions').length > 3 ) {


    $('.whiteBar').hide()
    $('.currentFiltersAdded').css('hieght', 'auto')
 console.log("sdvubsdvobvds")

}
})

$('.leaveIt').on('mouseleave', function(e) {
  if($('.whiteBar').css('display') == 'none' && $('.tab-pane.active.show .currentFiltersAdded .theOptions').length > 3 ) {

     e.stopPropagation()
      $('.whiteBar').show()
    $('.currentFiltersAdded').animate({
          minHeight: "none",
          maxHeight:"100px",
          height:"auto"
    },400);
  }
})


  return (
    <>

<div className="leaveIt">
<p className="text-center pHidden mb-2 hidden">Selected Filters</p>

    <div className="currentFiltersAdded">

      <div className="whiteBar">
        <i class="fas fa-circle">
          <h6 className="numberCounter"></h6>
        </i>
        <p class="text-center mostSmall">hover to see all</p>
      </div>
      <div className="wrapOptions">
        {Object.keys(selectedAccountGroup)?.map((selection) => {
          return (
            <div className="theOptions" key={selection}>
              <p className="mb-0 blue">{selectedAccountGroup[selection]}</p>
              <i
                onClick={() => removeAccount(selectedAccountGroup[selection])}
                className="fal fal fa-times blue"
              ></i>
            </div>
          );
        })}
      </div>

      </div>
</div>
    </>
  );
};

export default CurrentAccountGroup;

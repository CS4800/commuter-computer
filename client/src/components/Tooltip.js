/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'reactstrap';

const ToolTip = props => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  const tooltipId = `ToolTip-${props.id}`;

  if (props.tooltipText)
    return (
      <div>
        <span style={props.bodyStyle} href='#' id={tooltipId}>
          {props.body}
        </span>
        <Tooltip
          placement={props.placement}
          isOpen={tooltipOpen}
          target={tooltipId}
          toggle={toggle}
        >
          {props.tooltipText}
        </Tooltip>
      </div>
    );
  else
    return (
      <div>
        <span style={props.bodyStyle} href='#' id={tooltipId}>
          {props.body}
        </span>
      </div>
    );
};

ToolTip.propTypes = {
  id: PropTypes.number,
  body: PropTypes.string,
  tooltipText: PropTypes.string
};

export default ToolTip;

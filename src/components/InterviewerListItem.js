import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const nameSelect = () => {
    if (props.selected) {
      return props.name;
    }
  };

  const interviewClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li className={interviewClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {nameSelect()}
    </li>
  );
}

import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const formatSpots = () => {
    const numSpots = props.spots;
    if (numSpots === 0) {
      return "no spots";
    } else if (numSpots === 1) {
      return "1 spot";
    } else {
      return `${numSpots} spots`;
    }
  };

  const dayClass = classNames(
    "day-list__item",
    { "day-list__item--selected": props.selected },
    { "day-list__item--full": props.spots === 0 }
  );

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()} remaining</h3>
    </li>
  );
}

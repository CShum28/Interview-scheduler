import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewList(props) {
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={(event) => props.onChange(interviewer.id)}
      />
    );
  });

  return (
    <ul className="interviewers__header interviewers__list">{interviewers}</ul>
  );
}

import React from "react";
import "components/Appointment/styles.scss";
// import Appointment from "components/Appointment/index.js";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = 'SAVING';
  const DELETING = 'DELETING'
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(()=>transition(SHOW));
  };

  const deleteAppointment = function () {
    console.log(props.id)
    transition(DELETING)
    props.cancelInterview(props.id)
    .then(()=>transition(EMPTY))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          id={props.id} // this is for the timeslot
          onSave={save}
          bookInterview={props.bookInterview}
          onCancel={back}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          delete={deleteAppointment}
        />
      )}
      {mode === SAVING && (
        <Status 
          message='Saving'
        />
      )}
      {mode === DELETING && (
        <Status 
          message='Deleting'
        />
      )}
    </article>
  );
}

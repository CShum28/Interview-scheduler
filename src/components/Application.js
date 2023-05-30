import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment/index";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const daysApi = `/api/days`; // because in package.json we have - "proxy": "http://localhost:8001" - all we need is the endpoint
  const appointmentsApi = `/api/appointments`;
  const interviewersApi = `/api/interviewers`;

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  console.log("From getInterviewersForDay", interviewers);

  const setDay = (day) => setState((prev) => ({ ...prev, day }));
  // const setDays = (days) => setState((prev) => ({ ...prev, days }));

  const bookInterview = function (id, interview) {
    console.log(id, interview);
  };

  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
  };

  useEffect(() => {
    Promise.all([
      axios.get(daysApi),
      axios.get(appointmentsApi),
      axios.get(interviewersApi),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   axios.get(daysApi).then((response) => {
  //     console.log(response);
  //     setDays(response.data);
  //   });
  // }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview);
          return (
            <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers={interviewers}
              bookInterview={bookInterview}
            />
          );
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
